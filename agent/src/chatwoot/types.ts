import { z } from "zod";
import type { NormalizedMessageEvent } from "../domain/types.js";
import { normalizePhone } from "../utils/phone.js";

const senderSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().optional(),
    phone_number: z.string().optional(),
    type: z.string().optional()
  })
  .passthrough()
  .optional();

const conversationSchema = z
  .object({
    id: z.number(),
    account_id: z.number().optional(),
    inbox_id: z.number().optional(),
    status: z.string().optional(),
    labels: z.array(z.string()).optional(),
    assignee_id: z.number().nullable().optional(),
    team_id: z.number().nullable().optional(),
    contact: senderSchema
  })
  .passthrough();

const chatwootWebhookSchema = z
  .object({
    event: z.string().optional(),
    id: z.number().optional(),
    message_id: z.number().optional(),
    content: z.string().nullable().optional(),
    message_type: z.string().optional(),
    private: z.boolean().optional(),
    sender: senderSchema,
    conversation: conversationSchema.optional(),
    account: z.object({ id: z.number().optional() }).passthrough().optional()
  })
  .passthrough();

export type ChatwootWebhookPayload = z.infer<typeof chatwootWebhookSchema>;

export function normalizeChatwootWebhook(payload: unknown): NormalizedMessageEvent | null {
  const parsed = chatwootWebhookSchema.safeParse(payload);
  if (!parsed.success) return null;

  const data = parsed.data;
  const conversation = data.conversation;
  if (!conversation) return null;

  const contact = conversation.contact ?? data.sender;
  const messageId = data.id ?? data.message_id;
  if (!messageId) return null;

  const messageType = data.message_type ?? "incoming";
  const direction = messageType === "incoming" ? "incoming" : "outgoing";

  return {
    eventId: `${data.event ?? "message"}:${messageId}`,
    channel: "chatwoot",
    accountId: data.account?.id ?? conversation.account_id ?? 0,
    inboxId: conversation.inbox_id,
    conversationId: conversation.id,
    messageId,
    contactId: contact?.id,
    contactName: contact?.name,
    phoneE164: normalizePhone(contact?.phone_number),
    content: data.content ?? "",
    direction,
    messageType,
    private: data.private ?? false,
    senderType: data.sender?.type,
    assigneeId: conversation.assignee_id,
    teamId: conversation.team_id,
    status: conversation.status,
    labels: conversation.labels ?? [],
    rawPayload: payload
  };
}
