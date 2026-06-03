import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.string().default("development"),
  APP_ENV: z.enum(["dev", "staging", "prod"]).default("dev"),
  PORT: z.coerce.number().int().positive().default(3000),
  APP_BASE_URL: z.string().url().default("http://localhost:3000"),

  DATABASE_URL: z.string().min(1),

  OPENROUTER_API_KEY: z.string().min(1),
  OPENROUTER_BASE_URL: z.string().url().default("https://openrouter.ai/api/v1"),
  RESPONDER_MODEL: z.string().default("openai/gpt-5.3-chat"),
  RESPONDER_FALLBACK_MODEL: z.string().default("openai/gpt-5.3-chat"),

  LANGSMITH_TRACING: z
    .string()
    .default("false")
    .transform((value) => value === "true"),
  LANGSMITH_API_KEY: z.string().optional(),
  LANGSMITH_PROJECT: z.string().default("mazylabs-whatsapp-agent-dev"),
  LANGSMITH_ENDPOINT: z.string().url().default("https://api.smith.langchain.com"),

  CHATWOOT_BASE_URL: z.string().url(),
  CHATWOOT_ACCOUNT_ID: z.coerce.number().int().positive(),
  CHATWOOT_API_ACCESS_TOKEN: z.string().min(1),
  CHATWOOT_WEBHOOK_SECRET: z.string().optional(),
  CHATWOOT_AGENT_BOT_IDENTIFIER: z.string().default("mazylabs-agent"),

  HUMAN_ASSIGNEE_ID_VINICIUS: z.coerce.number().int().positive().optional(),
  HUMAN_ASSIGNEE_ID_AGATA: z.coerce.number().int().positive().optional(),
  HUMAN_TEAM_ID: z.coerce.number().int().positive().optional(),
  HUMAN_ALERT_PHONE_VINICIUS: z.string().default("+5511979810832"),
  HUMAN_ALERT_PHONE_AGATA: z.string().optional(),

  RESPONSE_MIN_DELAY_MS: z.coerce.number().int().min(0).default(900),
  RESPONSE_MAX_DELAY_MS: z.coerce.number().int().min(0).default(2400),
  MAX_RESPONSE_CHUNKS: z.coerce.number().int().min(1).max(4).default(4)
});

export const config = schema.parse(process.env);

export type Config = typeof config;
