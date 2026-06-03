import cors from "@fastify/cors";
import Fastify from "fastify";
import { config } from "./config.js";
import { createResponderAgent } from "./agents/responder.js";
import { createOpenRouterClient } from "./ai/openrouter.js";
import { createChatwootClient } from "./chatwoot/client.js";
import { createDb } from "./db/client.js";
import { configureLangSmith } from "./observability/langsmith.js";
import { registerHealthRoutes } from "./routes/health.js";
import { registerChatwootWebhookRoutes } from "./webhooks/chatwoot.js";

export async function buildServer() {
  configureLangSmith(config);

  const app = Fastify({
    logger: {
      level: config.NODE_ENV === "production" ? "info" : "debug"
    }
  });

  await app.register(cors, { origin: true });

  const db = createDb(config.DATABASE_URL);
  const chatwoot = createChatwootClient(config);
  const model = createOpenRouterClient(config);
  const responder = createResponderAgent({ db, model, config });

  registerHealthRoutes(app);
  registerChatwootWebhookRoutes(app, {
    config,
    db,
    chatwoot,
    responder
  });

  app.addHook("onClose", async () => {
    await db.close();
  });

  return app;
}

const app = await buildServer();
await app.listen({ host: "0.0.0.0", port: config.PORT });
