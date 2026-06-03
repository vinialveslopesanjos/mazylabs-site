import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { nanoid } from "nanoid";
import type { Config } from "../config.js";
import type { Db } from "../db/client.js";
import {
  getLeadMemory,
  getRecentMessages,
  updateLeadMemory
} from "../db/repositories.js";
import type { AgentOutput, LeadMemory, NormalizedMessageEvent, RecentMessage, StoredConversation } from "../domain/types.js";
import type { ChatCompletionResult } from "../ai/openrouter.js";
import { buildResponderPrompt } from "./prompt.js";
import { parseAndGuardrail } from "./guardrail.js";

type ModelClient = {
  complete(prompt: string): Promise<ChatCompletionResult>;
};

export type ResponderInput = {
  event: NormalizedMessageEvent;
  storedConversation: StoredConversation;
};

export type ResponderResult = {
  runId: string;
  shouldRespond: boolean;
  output: AgentOutput;
  memory: LeadMemory;
  rawModelOutput?: string;
  usage?: unknown;
};

const AgentState = Annotation.Root({
  runId: Annotation<string>(),
  event: Annotation<NormalizedMessageEvent>(),
  storedConversation: Annotation<StoredConversation>(),
  shouldRespond: Annotation<boolean>(),
  memory: Annotation<LeadMemory>(),
  recentMessages: Annotation<RecentMessage[]>(),
  prompt: Annotation<string>(),
  rawModelOutput: Annotation<string | undefined>(),
  usage: Annotation<unknown | undefined>(),
  output: Annotation<AgentOutput>()
});

export function createResponderAgent(input: {
  db: Db;
  model: ModelClient;
  config: Config;
}) {
  const { db, model, config } = input;

  const graph = new StateGraph(AgentState)
    .addNode("decide_pause", async (state) => {
      const shouldRespond = shouldAgentRespond(state.event, state.storedConversation);
      return { shouldRespond };
    })
    .addNode("load_memory", async (state) => {
      const memory = await getLeadMemory(db, state.storedConversation.localContactId);
      const recentMessages = await getRecentMessages(db, state.storedConversation.localConversationId);
      return { memory, recentMessages };
    })
    .addNode("build_prompt", async (state) => ({
      prompt: buildResponderPrompt({
        message: state.event.content,
        memory: state.memory,
        recentMessages: state.recentMessages
      })
    }))
    .addNode("call_model", async (state) => {
      const completion = await model.complete(state.prompt);
      return {
        rawModelOutput: completion.content,
        usage: completion.usage
      };
    })
    .addNode("guardrail", async (state) => ({
      output: parseAndGuardrail(state.rawModelOutput ?? "{}", config.MAX_RESPONSE_CHUNKS)
    }))
    .addNode("persist_memory", async (state) => {
      await updateLeadMemory(db, state.storedConversation.localContactId, state.output.memoryPatch);
      const memory = await getLeadMemory(db, state.storedConversation.localContactId);
      return { memory };
    })
    .addNode("no_op", async () => ({
      output: {
        decision: "ignore",
        riskLevel: "low",
        chunks: [],
        internalSummary: "Agent ignored event because it is paused, outgoing, private, empty, or assigned.",
        memoryPatch: {}
      } satisfies AgentOutput
    }))
    .addEdge(START, "decide_pause")
    .addConditionalEdges("decide_pause", (state) => (state.shouldRespond ? "load_memory" : "no_op"))
    .addEdge("load_memory", "build_prompt")
    .addEdge("build_prompt", "call_model")
    .addEdge("call_model", "guardrail")
    .addEdge("guardrail", "persist_memory")
    .addEdge("persist_memory", END)
    .addEdge("no_op", END)
    .compile();

  return {
    async invoke(runInput: ResponderInput): Promise<ResponderResult> {
      const runId = nanoid();
      const result = await graph.invoke({
        runId,
        event: runInput.event,
        storedConversation: runInput.storedConversation,
        shouldRespond: false,
        memory: {
          painPoints: [],
          servicesInterest: [],
          stage: "new",
          summary: ""
        },
        recentMessages: [],
        prompt: "",
        rawModelOutput: undefined,
        usage: undefined,
        output: {
          decision: "ignore",
          riskLevel: "low",
          chunks: [],
          internalSummary: "",
          memoryPatch: {}
        }
      });

      return {
        runId,
        shouldRespond: result.shouldRespond,
        output: result.output,
        memory: result.memory,
        rawModelOutput: result.rawModelOutput,
        usage: result.usage
      };
    }
  };
}

function shouldAgentRespond(event: NormalizedMessageEvent, stored: StoredConversation) {
  if (event.direction !== "incoming") return false;
  if (event.private) return false;
  if (!event.content.trim()) return false;
  if (stored.agentPaused) return false;
  if (stored.assigneeId) return false;
  if (stored.labels.includes("agent_paused")) return false;
  if (stored.labels.includes("human_handoff")) return false;
  return true;
}
