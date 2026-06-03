import { z } from "zod";
import type { AgentOutput } from "../domain/types.js";

const outputSchema = z.object({
  decision: z.enum(["answer", "handoff", "pause", "ignore"]),
  riskLevel: z.enum(["low", "medium", "high"]),
  chunks: z.array(z.string()).default([]),
  internalSummary: z.string().default(""),
  handoff: z
    .object({
      reason: z.string(),
      summary: z.string(),
      suggestedReply: z.string().optional(),
      assignTo: z.enum(["vinicius", "agata", "team"]).optional()
    })
    .optional(),
  memoryPatch: z
    .object({
      companyName: z.string().optional(),
      contactName: z.string().optional(),
      role: z.string().optional(),
      painPoints: z.array(z.string()).optional(),
      servicesInterest: z.array(z.string()).optional(),
      urgency: z.string().optional(),
      budgetSignal: z.string().optional(),
      stage: z.enum(["new", "qualifying", "proposal", "handoff", "paused", "closed"]).optional(),
      summary: z.string().optional(),
      lastHandoffReason: z.string().optional()
    })
    .default({})
});

const unsafePatterns = [
  /sou humano/i,
  /sou o vin[ií]cius/i,
  /pre[cç]o fechado/i,
  /garanto/i,
  /com certeza resolvemos/i
];

export function parseAndGuardrail(raw: string, maxChunks: number): AgentOutput {
  const parsedJson = safeJson(raw);
  const parsed = outputSchema.safeParse(parsedJson);
  if (!parsed.success) return fallback("parse_error", "Nao consegui interpretar a resposta do modelo.");

  const cleanChunks = parsed.data.chunks
    .map(cleanChunk)
    .filter(Boolean)
    .slice(0, maxChunks);

  const hasUnsafeText = cleanChunks.some((chunk) => unsafePatterns.some((pattern) => pattern.test(chunk)));
  if (hasUnsafeText) {
    return fallback("unsafe_wording", "A resposta gerada ficou assertiva demais.");
  }

  if (parsed.data.decision === "answer" && cleanChunks.length === 0) {
    return fallback("empty_answer", "A resposta veio vazia.");
  }

  if (parsed.data.decision === "handoff" && cleanChunks.length === 0) {
    cleanChunks.push("Vou chamar alguem da MazyLabs pra te responder melhor.");
  }

  return {
    decision: parsed.data.decision,
    riskLevel: parsed.data.riskLevel,
    chunks: cleanChunks,
    internalSummary: parsed.data.internalSummary,
    handoff: parsed.data.handoff,
    memoryPatch: parsed.data.memoryPatch
  };
}

function safeJson(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return {};
    try {
      return JSON.parse(match[0]);
    } catch {
      return {};
    }
  }
}

function cleanChunk(value: string) {
  return value
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+\n/g, "\n")
    .trim()
    .slice(0, 700);
}

function fallback(reason: string, summary: string): AgentOutput {
  return {
    decision: "handoff",
    riskLevel: "high",
    chunks: ["Vou chamar alguem da MazyLabs pra te responder melhor."],
    internalSummary: summary,
    handoff: {
      reason,
      summary
    },
    memoryPatch: {
      stage: "handoff",
      lastHandoffReason: reason
    }
  };
}
