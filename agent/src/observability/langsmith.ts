import type { Config } from "../config.js";

export function configureLangSmith(config: Config) {
  if (!config.LANGSMITH_TRACING) return;
  process.env.LANGSMITH_TRACING = "true";
  process.env.LANGCHAIN_TRACING_V2 = "true";
  process.env.LANGSMITH_PROJECT = config.LANGSMITH_PROJECT;
  process.env.LANGSMITH_ENDPOINT = config.LANGSMITH_ENDPOINT;
  if (config.LANGSMITH_API_KEY) {
    process.env.LANGSMITH_API_KEY = config.LANGSMITH_API_KEY;
    process.env.LANGCHAIN_API_KEY = config.LANGSMITH_API_KEY;
  }
}
