import { describe, expect, it } from "vitest";
import fixture from "./fixtures/chatwoot-message-created.json" assert { type: "json" };
import { normalizeChatwootWebhook } from "../src/chatwoot/types.js";

describe("normalizeChatwootWebhook", () => {
  it("normalizes an incoming Chatwoot message", () => {
    const event = normalizeChatwootWebhook(fixture);

    expect(event).toMatchObject({
      accountId: 1,
      conversationId: 7001,
      messageId: 9001,
      direction: "incoming",
      private: false,
      contactName: "Joao Silva",
      phoneE164: "+5511999999999"
    });
  });

  it("ignores unsupported payloads", () => {
    expect(normalizeChatwootWebhook({ event: "ping" })).toBeNull();
  });
});
