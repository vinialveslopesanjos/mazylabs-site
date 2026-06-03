import { parsePhoneNumberFromString } from "libphonenumber-js";

export function normalizePhone(value?: string | null) {
  if (!value) return undefined;
  const parsed = parsePhoneNumberFromString(value, "BR");
  if (!parsed?.isValid()) return value.replace(/[^\d+]/g, "");
  return parsed.number;
}
