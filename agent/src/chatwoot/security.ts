import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyOptionalWebhookSignature(input: {
  secret?: string;
  rawBody?: string;
  signature?: string;
}) {
  if (!input.secret) return true;
  if (!input.rawBody || !input.signature) return false;

  const expected = createHmac("sha256", input.secret).update(input.rawBody).digest("hex");
  const normalized = input.signature.replace(/^sha256=/, "");

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(normalized));
  } catch {
    return false;
  }
}
