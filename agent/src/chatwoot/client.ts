import type { Config } from "../config.js";

export type ChatwootClient = ReturnType<typeof createChatwootClient>;

export function createChatwootClient(config: Config) {
  const baseUrl = config.CHATWOOT_BASE_URL.replace(/\/$/, "");
  const accountId = config.CHATWOOT_ACCOUNT_ID;

  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(`${baseUrl}/api/v1/accounts/${accountId}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "api_access_token": config.CHATWOOT_API_ACCESS_TOKEN,
        ...(init.headers ?? {})
      }
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Chatwoot ${response.status} ${response.statusText}: ${body}`);
    }

    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  }

  return {
    async sendMessage(conversationId: number, content: string) {
      return request<{ id?: number; source_id?: string }>(`/conversations/${conversationId}/messages`, {
        method: "POST",
        body: JSON.stringify({
          content,
          message_type: "outgoing",
          private: false
        })
      });
    },

    async createPrivateNote(conversationId: number, content: string) {
      return request<{ id?: number }>(`/conversations/${conversationId}/messages`, {
        method: "POST",
        body: JSON.stringify({
          content,
          message_type: "outgoing",
          private: true
        })
      });
    },

    async setLabels(conversationId: number, labels: string[]) {
      return request(`/conversations/${conversationId}/labels`, {
        method: "POST",
        body: JSON.stringify({ labels })
      });
    },

    async assign(conversationId: number, input: { assigneeId?: number; teamId?: number }) {
      return request(`/conversations/${conversationId}/assignments`, {
        method: "POST",
        body: JSON.stringify({
          assignee_id: input.assigneeId ?? null,
          team_id: input.teamId ?? null
        })
      });
    }
  };
}
