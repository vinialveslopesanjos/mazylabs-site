# MazyLabs WhatsApp Agent

Backend do agente de WhatsApp da MazyLabs.

## Fluxo

```text
WhatsApp Cloud API -> Chatwoot -> webhook do agente -> LangGraph -> Chatwoot
```

O agente responde leads comerciais, guarda memoria persistente e faz handoff humano quando a conversa precisa de Vinicius ou Agata.

## Local

```bash
cp .env.example .env
npm install
npm run migrate
npm run dev
```

## Producao

O compose expoe a API em `127.0.0.1:13100`. O Nginx da VPS deve publicar `https://agent.mazylabs.com` para esse upstream.

```bash
npm run build
docker compose up -d --build
docker compose exec api npm run migrate:prod
```

## Webhook

```text
POST /webhooks/chatwoot
```

Configure esse endpoint em Chatwoot Webhooks.
