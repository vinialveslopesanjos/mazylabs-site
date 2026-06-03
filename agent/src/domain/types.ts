export type ConversationChannel = "chatwoot";

export type NormalizedMessageEvent = {
  eventId: string;
  channel: ConversationChannel;
  accountId: number;
  inboxId?: number;
  conversationId: number;
  messageId: number;
  contactId?: number;
  contactName?: string;
  phoneE164?: string;
  content: string;
  direction: "incoming" | "outgoing";
  messageType?: string;
  private: boolean;
  senderType?: string;
  assigneeId?: number | null;
  teamId?: number | null;
  status?: string;
  labels: string[];
  rawPayload: unknown;
};

export type LeadMemory = {
  companyName?: string;
  contactName?: string;
  role?: string;
  painPoints: string[];
  servicesInterest: string[];
  urgency?: string;
  budgetSignal?: string;
  stage: "new" | "qualifying" | "proposal" | "handoff" | "paused" | "closed";
  summary: string;
  lastHandoffReason?: string;
};

export type RecentMessage = {
  direction: "incoming" | "outgoing";
  content: string;
  private: boolean;
  createdAt: string;
};

export type AgentDecision = "answer" | "handoff" | "pause" | "ignore";
export type RiskLevel = "low" | "medium" | "high";

export type AgentOutput = {
  decision: AgentDecision;
  riskLevel: RiskLevel;
  chunks: string[];
  internalSummary: string;
  handoff?: {
    reason: string;
    summary: string;
    suggestedReply?: string;
    assignTo?: "vinicius" | "agata" | "team";
  };
  memoryPatch: Partial<LeadMemory>;
};

export type StoredConversation = {
  localConversationId: number;
  localContactId?: number;
  agentPaused: boolean;
  labels: string[];
  assigneeId?: number | null;
  teamId?: number | null;
};
