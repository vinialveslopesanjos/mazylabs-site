import { NextResponse } from 'next/server';
import { parseCategory, SYSTEM_PROMPT } from '@/app/lib/sentiment';

const DEFAULT_MODEL = 'openrouter/free';

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const text = typeof body?.text === 'string' ? body.text.trim() : '';

  if (text.length < 3) {
    return NextResponse.json({ category: 'dúvida' }, { status: 400 });
  }

  const model = process.env.OPENROUTER_MODEL ?? DEFAULT_MODEL;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://mazylabs.com',
      'X-Title': 'MazySentiment',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text },
      ],
      max_tokens: 20,
      temperature: 0,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    const errorBody = await res.text().catch(() => '');
    return NextResponse.json(
      { error: `OpenRouter error: ${res.status}`, details: errorBody.slice(0, 500) },
      { status: res.status }
    );
  }

  const data = await res.json();
  const content: string = data?.choices?.[0]?.message?.content ?? '';
  const category = parseCategory(content);

  return NextResponse.json({ category, model });
}
