# Facebook, WhatsApp e Chatwoot setup

## 1. Rotacionar secrets

Antes de producao, revogue e gere novamente:

- token temporario da Meta que foi colado no chat;
- chaves LangSmith/LangChain que foram coladas no chat;
- qualquer secret exposto em terminal, container ou historico.

## 2. Meta App

App: `1576363064049935`

Campos:

- App Domains: `mazylabs.com`
- Privacy Policy: `https://mazylabs.com/politica-de-privacidade`
- Terms: `https://mazylabs.com/termos-de-servico`
- Data deletion: `https://mazylabs.com/exclusao-de-dados`

Quando pronto, colocar o app em Live.

## 3. WhatsApp Manager

- Adicionar o numero de producao `+55 11 94541-0931`.
- Validar OTP e display name `MazyLabs`.
- Copiar `WHATSAPP_PHONE_NUMBER_ID` e `WHATSAPP_BUSINESS_ACCOUNT_ID`.
- Configurar forma de pagamento.
- Criar template `human_handoff_alert` se alertas internos forem enviados fora da janela de 24h.

## 4. Token permanente

Em Business Settings:

1. Criar System User admin.
2. Atribuir o app e a WhatsApp Business Account.
3. Gerar token com `whatsapp_business_messaging`, `whatsapp_business_management` e, se necessario, `whatsapp_business_manage_events`.
4. Salvar somente no `.env` do Chatwoot ou backend.

## 5. Chatwoot

- Subir Chatwoot em `https://inbox.mazylabs.com`.
- Criar inbox WhatsApp Cloud API.
- Preencher telefone, Phone Number ID, WABA ID e token permanente.
- Adicionar Vinicius e Agata como agentes/time.
- Copiar callback URL e verify token gerados pelo Chatwoot.

## 6. Webhook Meta

No app Meta, em WhatsApp -> Configuration/Webhook:

- Callback URL: URL do Chatwoot, por exemplo `https://inbox.mazylabs.com/webhooks/whatsapp/+5511945410931`.
- Verify Token: token gerado pelo Chatwoot.
- Assinar o campo `messages`.

## 7. Webhook do agente

No Chatwoot, criar webhook para:

```text
https://agent.mazylabs.com/webhooks/chatwoot
```

Assinar eventos:

- `message_created`
- `conversation_updated`
- `conversation_status_changed`

O backend ignora mensagens outgoing, notas privadas sem comando e eventos duplicados.
