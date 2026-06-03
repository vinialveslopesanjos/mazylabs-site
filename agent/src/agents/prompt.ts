import type { LeadMemory, RecentMessage } from "../domain/types.js";
import { MAZYLABS_VOICE_GUIDE } from "./mazylabsVoice.js";

export function buildResponderPrompt(input: {
  message: string;
  memory: LeadMemory;
  recentMessages: RecentMessage[];
}) {
  return [
    MAZYLABS_VOICE_GUIDE,
    "",
    "Memoria persistente do lead:",
    JSON.stringify(input.memory, null, 2),
    "",
    "Mensagens recentes:",
    input.recentMessages
      .filter((message) => !message.private)
      .map((message) => `${message.direction}: ${message.content}`)
      .join("\n") || "sem historico recente",
    "",
    `Mensagem atual: ${input.message}`,
    "",
    "Responda somente JSON valido neste formato:",
    JSON.stringify(
      {
        decision: "answer | handoff | pause | ignore",
        riskLevel: "low | medium | high",
        chunks: ["mensagem curta 1", "mensagem curta 2"],
        internalSummary: "resumo interno curto",
        handoff: {
          reason: "motivo se decision=handoff",
          summary: "resumo para humano",
          suggestedReply: "opcional",
          assignTo: "vinicius | agata | team"
        },
        memoryPatch: {
          companyName: "opcional",
          contactName: "opcional",
          role: "opcional",
          painPoints: ["opcional"],
          servicesInterest: ["opcional"],
          urgency: "opcional",
          budgetSignal: "opcional",
          stage: "new | qualifying | proposal | handoff | paused | closed",
          summary: "resumo persistente atualizado"
        }
      },
      null,
      2
    ),
    "",
    "Regras de saida:",
    "- chunks deve ter de 1 a 4 mensagens, cada uma curta.",
    "- Se decision for handoff, inclua tambem uma resposta curta ao cliente avisando que vai chamar alguem.",
    "- Se a pessoa pedir para pausar ou falar com humano, decision=handoff.",
    "- Nunca diga que e humano. Se perguntarem, diga que e assistente da MazyLabs.",
    "- Nao invente preco, prazo, case ou disponibilidade de agenda."
  ].join("\n");
}
