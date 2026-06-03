import type { QueryResult, QueryResultRow } from "pg";
import type { LeadMemory, NormalizedMessageEvent, RecentMessage, StoredConversation } from "../domain/types.js";

type Queryable = {
  query<T extends QueryResultRow = QueryResultRow>(sql: string, params?: unknown[]): Promise<QueryResult<T>>;
};

export async function upsertContact(db: Queryable, event: NormalizedMessageEvent) {
  if (!event.contactId && !event.phoneE164) return undefined;

  const result = await db.query<{ id: number }>(
    `
    insert into contacts (chatwoot_contact_id, phone_e164, name)
    values ($1, $2, $3)
    on conflict (chatwoot_contact_id) do update
      set phone_e164 = coalesce(excluded.phone_e164, contacts.phone_e164),
          name = coalesce(excluded.name, contacts.name),
          updated_at = now()
    returning id
    `,
    [event.contactId ?? null, event.phoneE164 ?? null, event.contactName ?? null]
  );

  return result.rows[0]?.id;
}

export async function upsertConversation(
  db: Queryable,
  event: NormalizedMessageEvent,
  contactId?: number
): Promise<StoredConversation> {
  const paused = isAgentPaused(event);
  const result = await db.query<{
    id: number;
    contact_id?: number;
    agent_paused: boolean;
    labels: string[];
    assignee_id?: number | null;
    team_id?: number | null;
  }>(
    `
    insert into conversations (
      chatwoot_conversation_id,
      contact_id,
      status,
      assignee_id,
      team_id,
      labels,
      agent_paused
    )
    values ($1, $2, $3, $4, $5, $6, $7)
    on conflict (chatwoot_conversation_id) do update
      set contact_id = coalesce(excluded.contact_id, conversations.contact_id),
          status = coalesce(excluded.status, conversations.status),
          assignee_id = excluded.assignee_id,
          team_id = excluded.team_id,
          labels = excluded.labels,
          agent_paused = excluded.agent_paused,
          updated_at = now()
    returning id, contact_id, agent_paused, labels, assignee_id, team_id
    `,
    [
      event.conversationId,
      contactId ?? null,
      event.status ?? null,
      event.assigneeId ?? null,
      event.teamId ?? null,
      event.labels,
      paused
    ]
  );

  const row = result.rows[0];
  return {
    localConversationId: row.id,
    localContactId: row.contact_id,
    agentPaused: row.agent_paused,
    labels: row.labels ?? [],
    assigneeId: row.assignee_id,
    teamId: row.team_id
  };
}

export async function storeIncomingMessage(
  db: Queryable,
  event: NormalizedMessageEvent,
  localConversationId: number,
  localContactId?: number
) {
  await db.query(
    `
    insert into messages (
      chatwoot_message_id,
      conversation_id,
      contact_id,
      direction,
      message_type,
      content,
      private,
      sender_type,
      raw_payload
    )
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    on conflict (chatwoot_message_id) do nothing
    `,
    [
      event.messageId,
      localConversationId,
      localContactId ?? null,
      event.direction,
      event.messageType ?? null,
      event.content,
      event.private,
      event.senderType ?? null,
      JSON.stringify(event.rawPayload)
    ]
  );
}

export async function getLeadMemory(db: Queryable, contactId?: number): Promise<LeadMemory> {
  if (!contactId) return emptyLeadMemory();
  const result = await db.query<{
    company_name?: string;
    contact_name?: string;
    role?: string;
    pain_points: string[];
    services_interest: string[];
    urgency?: string;
    budget_signal?: string;
    stage: LeadMemory["stage"];
    summary: string;
    last_handoff_reason?: string;
  }>("select * from lead_memory where contact_id = $1", [contactId]);

  const row = result.rows[0];
  if (!row) return emptyLeadMemory();
  return {
    companyName: row.company_name,
    contactName: row.contact_name,
    role: row.role,
    painPoints: row.pain_points ?? [],
    servicesInterest: row.services_interest ?? [],
    urgency: row.urgency,
    budgetSignal: row.budget_signal,
    stage: row.stage,
    summary: row.summary ?? "",
    lastHandoffReason: row.last_handoff_reason
  };
}

export async function updateLeadMemory(db: Queryable, contactId: number | undefined, patch: Partial<LeadMemory>) {
  if (!contactId) return;
  const current = await getLeadMemory(db, contactId);
  const next: LeadMemory = {
    ...current,
    ...patch,
    painPoints: mergeList(current.painPoints, patch.painPoints),
    servicesInterest: mergeList(current.servicesInterest, patch.servicesInterest),
    stage: patch.stage ?? current.stage
  };

  await db.query(
    `
    insert into lead_memory (
      contact_id,
      company_name,
      contact_name,
      role,
      pain_points,
      services_interest,
      urgency,
      budget_signal,
      stage,
      summary,
      last_handoff_reason
    )
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    on conflict (contact_id) do update
      set company_name = excluded.company_name,
          contact_name = excluded.contact_name,
          role = excluded.role,
          pain_points = excluded.pain_points,
          services_interest = excluded.services_interest,
          urgency = excluded.urgency,
          budget_signal = excluded.budget_signal,
          stage = excluded.stage,
          summary = excluded.summary,
          last_handoff_reason = excluded.last_handoff_reason,
          updated_at = now()
    `,
    [
      contactId,
      next.companyName ?? null,
      next.contactName ?? null,
      next.role ?? null,
      next.painPoints,
      next.servicesInterest,
      next.urgency ?? null,
      next.budgetSignal ?? null,
      next.stage,
      next.summary,
      next.lastHandoffReason ?? null
    ]
  );
}

export async function getRecentMessages(db: Queryable, localConversationId: number, limit = 12): Promise<RecentMessage[]> {
  const result = await db.query<{
    direction: "incoming" | "outgoing";
    content: string;
    private: boolean;
    created_at: Date;
  }>(
    `
    select direction, content, private, created_at
    from messages
    where conversation_id = $1
    order by created_at desc
    limit $2
    `,
    [localConversationId, limit]
  );

  return result.rows
    .reverse()
    .map((row) => ({
      direction: row.direction,
      content: row.content,
      private: row.private,
      createdAt: row.created_at.toISOString()
    }));
}

export async function createAgentRun(
  db: Queryable,
  input: {
    runId: string;
    localConversationId: number;
    localContactId?: number;
    chatwootMessageId: number;
    decision: string;
    riskLevel: string;
    handoffRequired: boolean;
    inputText: string;
    outputChunks: string[];
    memoryPatch: unknown;
    rawOutput: unknown;
    error?: string;
  }
) {
  const result = await db.query<{ id: number }>(
    `
    insert into agent_runs (
      run_id,
      conversation_id,
      contact_id,
      chatwoot_message_id,
      decision,
      risk_level,
      handoff_required,
      input_text,
      output_chunks,
      memory_patch,
      raw_output,
      error
    )
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    returning id
    `,
    [
      input.runId,
      input.localConversationId,
      input.localContactId ?? null,
      input.chatwootMessageId,
      input.decision,
      input.riskLevel,
      input.handoffRequired,
      input.inputText,
      JSON.stringify(input.outputChunks),
      JSON.stringify(input.memoryPatch),
      JSON.stringify(input.rawOutput),
      input.error ?? null
    ]
  );
  return result.rows[0].id;
}

export async function createHandoff(
  db: Queryable,
  input: {
    localConversationId: number;
    localContactId?: number;
    agentRunId?: number;
    reason: string;
    summary: string;
    assignedTo?: string;
  }
) {
  await db.query(
    `
    insert into handoffs (conversation_id, contact_id, agent_run_id, reason, summary, assigned_to)
    values ($1, $2, $3, $4, $5, $6)
    `,
    [
      input.localConversationId,
      input.localContactId ?? null,
      input.agentRunId ?? null,
      input.reason,
      input.summary,
      input.assignedTo ?? null
    ]
  );
}

export async function createOutboxMessage(
  db: Queryable,
  input: {
    localConversationId: number;
    localContactId?: number;
    agentRunId?: number;
    content: string;
  }
) {
  const result = await db.query<{ id: number }>(
    `
    insert into outbox_messages (conversation_id, contact_id, agent_run_id, content)
    values ($1, $2, $3, $4)
    returning id
    `,
    [input.localConversationId, input.localContactId ?? null, input.agentRunId ?? null, input.content]
  );
  return result.rows[0].id;
}

export async function markOutboxSent(db: Queryable, outboxId: number, chatwootMessageId?: number) {
  await db.query(
    `
    update outbox_messages
    set status = 'sent', chatwoot_message_id = $2, sent_at = now()
    where id = $1
    `,
    [outboxId, chatwootMessageId ?? null]
  );
}

export async function markOutboxError(db: Queryable, outboxId: number, error: string) {
  await db.query(
    `
    update outbox_messages
    set status = 'error', error = $2
    where id = $1
    `,
    [outboxId, error]
  );
}

function isAgentPaused(event: NormalizedMessageEvent) {
  return Boolean(
    event.assigneeId ||
      event.labels.includes("agent_paused") ||
      event.labels.includes("human_handoff") ||
      event.status === "resolved"
  );
}

function emptyLeadMemory(): LeadMemory {
  return {
    painPoints: [],
    servicesInterest: [],
    stage: "new",
    summary: ""
  };
}

function mergeList(current: string[], patch?: string[]) {
  if (!patch) return current;
  return Array.from(new Set([...current, ...patch].map((item) => item.trim()).filter(Boolean))).slice(0, 12);
}
