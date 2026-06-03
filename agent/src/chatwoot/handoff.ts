import type { Config } from "../config.js";
import type { AgentOutput, LeadMemory, NormalizedMessageEvent } from "../domain/types.js";

export function chooseHandoffTarget(config: Config, output: AgentOutput) {
  const preferred = output.handoff?.assignTo;
  if (preferred === "agata" && config.HUMAN_ASSIGNEE_ID_AGATA) {
    return { assigneeId: config.HUMAN_ASSIGNEE_ID_AGATA, assignedTo: "agata" };
  }
  if (preferred === "vinicius" && config.HUMAN_ASSIGNEE_ID_VINICIUS) {
    return { assigneeId: config.HUMAN_ASSIGNEE_ID_VINICIUS, assignedTo: "vinicius" };
  }
  if (config.HUMAN_TEAM_ID) {
    return { teamId: config.HUMAN_TEAM_ID, assignedTo: "team" };
  }
  if (config.HUMAN_ASSIGNEE_ID_VINICIUS) {
    return { assigneeId: config.HUMAN_ASSIGNEE_ID_VINICIUS, assignedTo: "vinicius" };
  }
  return { assignedTo: "unassigned" };
}

export function buildHandoffNote(input: {
  event: NormalizedMessageEvent;
  output: AgentOutput;
  memory: LeadMemory;
}) {
  const handoff = input.output.handoff;
  const memory = input.memory;
  return [
    "[MazyLabs agent] Handoff humano solicitado",
    "",
    `Motivo: ${handoff?.reason ?? "Nao informado"}`,
    `Resumo: ${handoff?.summary ?? input.output.internalSummary}`,
    "",
    `Contato: ${input.event.contactName ?? "sem nome"} (${input.event.phoneE164 ?? "sem telefone"})`,
    `Empresa: ${memory.companyName ?? "nao identificado"}`,
    `Estagio: ${memory.stage}`,
    `Dores: ${memory.painPoints.join(", ") || "nao identificado"}`,
    `Interesses: ${memory.servicesInterest.join(", ") || "nao identificado"}`,
    "",
    `Ultima mensagem: ${input.event.content}`,
    handoff?.suggestedReply ? `\nResposta sugerida: ${handoff.suggestedReply}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}
