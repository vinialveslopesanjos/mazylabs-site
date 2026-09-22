import { NextResponse } from 'next/server';
import { parseCategory, SYSTEM_PROMPT } from '@/app/lib/sentiment';

export const maxDuration = 35;
const DEFAULT_MODEL = 'nvidia/nemotron-3.5-lightning:free';

function failure(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  if (text.length < 3 || text.length > 1000) {
    return failure('Digite um feedback entre 3 e 1000 caracteres.', 400);
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL?.trim() || DEFAULT_MODEL;
  // This public demo must never silently fall back to a paid model.
  if (!apiKey || (model !== DEFAULT_MODEL && !model.endsWith(':free'))) {
    return failure('Análise temporariamente indisponível.', 503);
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.mazylabs.com',
        'X-Title': 'MazySentiment',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text },
        ],
        max_tokens: 256,
        reasoning: { enabled: false },
        temperature: 0,
      }),
      signal: AbortSignal.timeout(30000),
      cache: 'no-store',
    });

    if (res.status === 429) return failure('Limite de análises gratuitas atingido.', 429);
    if (!res.ok) return failure('Análise temporariamente indisponível.', 503);

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    const category = typeof content === 'string' ? parseCategory(content) : null;
    if (!category) return failure('A IA não retornou uma categoria válida.', 502);
    return NextResponse.json({ category });
  } catch {
    return failure('Não foi possível concluir a análise. Tente novamente.', 503);
  }
}
