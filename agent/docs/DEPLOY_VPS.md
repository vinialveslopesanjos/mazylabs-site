# Deploy na VPS

VPS alvo:

```text
ssh -i C:\Users\Vinicius\.ssh\pbarbosa_vps_ed25519 -p 2222 root@147.93.13.49
```

## Estrutura recomendada

```text
/opt/mazylabs-whatsapp-agent
  .env
  docker-compose.yml
  Dockerfile
  package.json
  package-lock.json
  src/
```

## Nginx

Publicar o backend em:

```text
https://agent.mazylabs.com
```

Upstream local do compose:

```text
127.0.0.1:13100
```

Exemplo de bloco:

```nginx
server {
  server_name agent.mazylabs.com;

  location / {
    proxy_pass http://127.0.0.1:13100;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Depois emitir/renovar TLS com Certbot.

## Deploy

```bash
cd /opt/mazylabs-whatsapp-agent
cp .env.example .env
# preencher secrets no .env
docker compose up -d --build
docker compose exec api node dist/db/migrate.js
curl https://agent.mazylabs.com/health
```

## Variaveis obrigatorias

- `DATABASE_URL`
- `OPENROUTER_API_KEY`
- `CHATWOOT_BASE_URL`
- `CHATWOOT_ACCOUNT_ID`
- `CHATWOOT_API_ACCESS_TOKEN`
- `CHATWOOT_WEBHOOK_SECRET`

## Chatwoot webhook

No Chatwoot, criar webhook apontando para:

```text
https://agent.mazylabs.com/webhooks/chatwoot
```

Adicionar o header:

```text
x-mazylabs-webhook-secret: <CHATWOOT_WEBHOOK_SECRET>
```

Eventos:

- `message_created`
- `conversation_updated`
- `conversation_status_changed`

## Labels operacionais

- `agent_paused`: impede resposta automatica.
- `human_handoff`: criado quando o agente chama humano.

Se a conversa estiver atribuida a um agente humano, o backend tambem nao responde.
