import type { FastifyInstance } from "fastify";
import type { Config } from "../config.js";
import type { ChatwootClient } from "../chatwoot/client.js";
import { buildHandoffNote, chooseHandoffTarget } from "../chatwoot/handoff.js";
import { normalizeChatwootWebhook } from "../chatwoot/types.js";
import type { Db } from "../db/client.js";
import {
  createAgentRun,
  createHandoff,
  createOutboxMessage,
  markOutboxError,
  markOutboxSent,
  storeIncomingMessage,
  upsertContact,
  upsertConversation
} from "../db/repositories.js";
import type { createResponderAgent } from "../agents/responder.js";
import { jitter, sleep } from "../utils/sleep.js";

type ResponderAgent = ReturnType<typeof createResponderAgent>;

export function registerChatwootWebhookRoutes(
  app: FastifyInstance,
  services: {
    config: Config;
    db: Db;
    chatwoot: ChatwootClient;
    responder: ResponderAgent;
  }
) {
  app.post("/webhooks/chatwoot", async (request, reply) => {
    if (!isAuthorized(request.headers, services.config.CHATWOOT_WEBHOOK_SECRET)) {
      return reply.code(401).send({ ok: false, error: "unauthorized" });
    }

    const event = normalizeChatwootWebhook(request.body);
    if (!event) {
      return reply.code(202).send({ ok: true, ignored: "unsupported_payload" });
    }

    if (event.accountId && event.accountId !== services.config.CHATWOOT_ACCOUNT_ID) {
      return reply.code(202).send({ ok: true, ignored: "wrong_account" });
    }

    const localContactId = await upsertContact(services.db, event);
    const storedConversation = await upsertConversation(services.db, event, localContactId);
    await storeIncomingMessage(services.db, event, storedConversation.localConversationId, storedConversation.localContactId);

    const result = await services.responder.invoke({ event, storedConversation });
    const agentRunId = await createAgentRun(services.db, {
      runId: result.runId,
      localConversationId: storedConversation.localConversationId,
      localContactId: storedConversation.localContactId,
      chatwootMessageId: event.messageId,
      decision: result.output.decision,
      riskLevel: result.output.riskLevel,
      handoffRequired: result.output.decision === "handoff",
      inputText: event.content,
      outputChunks: result.output.chunks,
      memoryPatch: result.output.memoryPatch,
      rawOutput: {
        rawModelOutput: result.rawModelOutput,
        usage: result.usage,
        output: result.output
      }
    });

    if (!result.shouldRespond || result.output.decision === "ignore" || result.output.decision === "pause") {
      return reply.code(202).send({ ok: true, ignored: result.output.decision });
    }

    for (const chunk of result.output.chunks) {
      const outboxId = await createOutboxMessage(services.db, {
        localConversationId: storedConversation.localConversationId,
        localContactId: storedConversation.localContactId,
        agentRunId,
        content: chunk
      });

      try {
        await sleep(jitter(services.config.RESPONSE_MIN_DELAY_MS, services.config.RESPONSE_MAX_DELAY_MS));
        const sent = await services.chatwoot.sendMessage(event.conversationId, chunk);
        await markOutboxSent(services.db, outboxId, sent.id);
      } catch (error) {
        await markOutboxError(services.db, outboxId, error instanceof Error ? error.message : String(error));
        throw error;
      }
    }

    if (result.output.decision === "handoff") {
      const target = chooseHandoffTarget(services.config, result.output);
      const labels = Array.from(new Set([...event.labels, "human_handoff", "agent_paused"]));
      const note = buildHandoffNote({
        event,
        output: result.output,
        memory: result.memory
      });

      await services.chatwoot.setLabels(event.conversationId, labels);
      await services.chatwoot.createPrivateNote(event.conversationId, note);
      await services.chatwoot.assign(event.conversationId, {
        assigneeId: target.assigneeId,
        teamId: target.teamId
      });
      await createHandoff(services.db, {
        localConversationId: storedConversation.localConversationId,
        localContactId: storedConversation.localContactId,
        agentRunId,
        reason: result.output.handoff?.reason ?? "handoff",
        summary: result.output.handoff?.summary ?? result.output.internalSummary,
        assignedTo: target.assignedTo
      });
    }

    return reply.code(200).send({
      ok: true,
      runId: result.runId,
      decision: result.output.decision,
      chunks: result.output.chunks.length
    });
  });
}

function isAuthorized(headers: Record<string, unknown>, secret?: string) {
  if (!secret) return true;
  const received =
    headerValue(headers["x-mazylabs-webhook-secret"]) ??
    headerValue(headers["x-chatwoot-webhook-secret"]) ??
    headerValue(headers["x-webhook-secret"]);
  return received === secret;
}

function headerValue(value: unknown) {
  if (Array.isArray(value)) return value[0];
  if (typeof value === "string") return value;
  return undefined;
}
