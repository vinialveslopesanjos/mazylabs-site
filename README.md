# MazyLabs Site

Site institucional da [MazyLabs](https://www.mazylabs.com) — empresa de dados, IA, automação e sistemas sob medida em Campinas.

## Stack

- **Next.js 16** (App Router, API no servidor)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**
- **vis-network + vis-data** — grafos interativos
- **OpenRouter** (modelos gratuitos) — demo de classificação de sentimentos
- **pnpm 10**

## Estrutura

```
src/
  app/
    components/
      Header.tsx          # Nav com hamburger menu no mobile
      Hero.tsx            # Seção principal com CTA
      ClientLogos.tsx     # Marquee de logos dos clientes
      Services.tsx        # Grid de serviços (2 col mobile, 3 col desktop)
      CaseStudies.tsx     # Cases: Itaú (grafo interativo), PicPay, Nubank, XP
      NetworkGraph.tsx    # Grafo vis-network: MazyLabs ↔ clientes
      ItauGraph.tsx       # Grafo vis-network: rede de risco (demo Itaú)
      SentimentDemo.tsx   # Demonstração interativa via /api/sentiment
      Manifesto.tsx       # Valores e filosofia
      VisualIdentity.tsx  # Cartão de visita + console mockup
      CTABanner.tsx       # Faixa de CTA terracotta
      Footer.tsx          # Links + copyright
      FloatingCTA.tsx     # Botão WhatsApp fixo (aparece após 300px scroll)
    lib/
      sentiment.ts        # Prompt e parser de categorias de sentimento
    page.tsx
    layout.tsx
    globals.css
public/
  logos/                  # SVGs dos clientes (Itaú, PicPay, Nubank, XP)
  favicon.svg
```

## Variáveis de ambiente

Crie um `.env.local` na raiz:

```env
OPENROUTER_API_KEY="sua_key_aqui"
OPENROUTER_MODEL="liquid/lfm-2.5-2.6b:free"
```

Crie a chave no [OpenRouter](https://openrouter.ai/settings/keys). Ela fica somente no servidor: nunca use o prefixo `NEXT_PUBLIC_`. O modelo padrão `liquid/lfm-2.5-2.6b:free` usa modelos gratuitos; também é possível escolher um modelo com sufixo `:free`. A disponibilidade e as cotas dependem do OpenRouter.

## Comandos

```bash
pnpm install      # instalar dependências
pnpm dev          # servidor de desenvolvimento (localhost:4000)
pnpm build        # build de produção
pnpm start        # rodar o build localmente
```

## Deploy

O site é hospedado na **Vercel** com deploy automático via `git push` para a branch `main`.

Configurar no painel da Vercel:
- `OPENROUTER_API_KEY` → Settings → Environment Variables (secret)
- `OPENROUTER_MODEL=liquid/lfm-2.5-2.6b:free` (opcional)

Use o preset Next.js e o diretório de saída padrão; remova qualquer override para `out`. A rota POST `/api/sentiment` precisa de uma função no servidor, portanto não use exportação estática. Após configurar a chave, faça um novo deploy.

A API valida feedbacks de 3 a 1000 caracteres e retorna somente categorias válidas. Respostas inválidas, indisponibilidade e limites do provedor são tratados sem expor a chave ou detalhes internos.

## Responsividade

O layout usa breakpoints Tailwind mobile-first:

| Breakpoint | Largura | Comportamento |
|---|---|---|
| (padrão) | 0–767px | Mobile: 1 coluna, fontes menores, hamburger menu |
| `md:` | 768px+ | Desktop: layout completo, grids de 3 colunas |
| `lg:` | 1024px+ | Hero: layout de 12 colunas com logo à direita |

## Grafos interativos

Ambos os grafos usam **vis-network** com física barnesHut:

- **NetworkGraph** — nós fixos com posição manual, `minVelocity: 0.15` para movimento suave, tema dark/light via `MutationObserver`
- **ItauGraph** — 15 nós (PF/PJ), 3 em risco (vermelho), `minVelocity: 0.75` para animação contínua

Após estabilização, ambos chamam `fit()` + `moveTo()` com `scale * 0.72` para centralizar com zoom-out automático.
