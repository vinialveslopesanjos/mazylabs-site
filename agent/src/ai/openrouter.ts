import OpenAI from "openai";
import type { Config } from "../config.js";

export type ChatCompletionResult = {
  content: string;
  usage?: unknown;
  model?: string;
};

export function createOpenRouterClient(config: Config) {
  const client = new OpenAI({
    apiKey: config.OPENROUTER_API_KEY,
    baseURL: config.OPENROUTER_BASE_URL,
    defaultHeaders: {
      "HTTP-Referer": "https://mazylabs.com",
      "X-Title": "MazyLabs WhatsApp Agent"
    }
  });

  async function complete(prompt: string, model = config.RESPONDER_MODEL): Promise<ChatCompletionResult> {
    const response = await client.chat.completions.create({
      model,
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "Voce escreve apenas JSON valido. Nao inclua markdown."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return {
      content: response.choices[0]?.message?.content ?? "{}",
      usage: response.usage,
      model: response.model
    };
  }

  return { complete };
}
