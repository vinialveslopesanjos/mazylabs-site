'use client';

import { useState } from 'react';
import MazyLogo from './MazyLogo';
import { parseCategory, SYSTEM_PROMPT } from '../lib/sentiment';
import type { Category } from '../lib/sentiment';

const examples = [
  'O app é muito rápido e fácil de usar',
  'Demora muito pra carregar, trava direto',
  'Estou confuso sobre como usar essa funcionalidade',
  'Seria legal se tivesse modo escuro no app',
];

interface Result {
  category: Category;
  loading: boolean;
}


// Gemini 2.0 Flash — Google AI Studio (gratuito, 1500 req/dia)
// API key restrita ao domínio mazylabs.com no Google Cloud Console
async function analyzeWithGemini(text: string): Promise<Category> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'cole_sua_key_aqui') throw new Error('API key não configurada');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text }] }],
      generationConfig: { maxOutputTokens: 20, temperature: 0 },
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`Gemini ${res.status}`);
  const data = await res.json();
  const content: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  return parseCategory(content);
}

export default function SentimentDemo() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (text: string) => {
    if (result?.loading || text.trim().length < 3) return;
    setError(null);
    setResult({ category: 'dúvida', loading: true });

    try {
      const category = await analyzeWithGemini(text);
      setResult({ category, loading: false });
    } catch {
      setError('A demonstração está indisponível neste ambiente. Tente novamente mais tarde.');
      setResult(null);
    }
  };

  return (
    <section className="sentiment-section" aria-labelledby="sentiment-heading">
      <div className="sentiment-intro">
        <h2 id="sentiment-heading" className="section-title">Classificação de Sentimentos</h2>
        <p className="section-lead">
          Veja como classificamos feedbacks de clientes para priorizar atendimento, produto e retenção.
        </p>
      </div>
      <div className="sentiment-workbench">
        <div className="sentiment-brand">
          <MazyLogo color="var(--accent-text)" className="w-7 h-7 shrink-0" />
          <span>MazySentiment · Análise de Feedback</span>
        </div>
        <div className="sentiment-examples">
          {examples.map((ex) => (
            <button key={ex} type="button" disabled={result?.loading}
              onClick={() => { setInput(ex); analyze(ex); }}
              className="sentiment-example"
            >
              &ldquo;{ex}&rdquo;
            </button>
          ))}
        </div>
        <form onSubmit={(event) => { event.preventDefault(); analyze(input); }} className="sentiment-form">
          <label htmlFor="sentiment-input">Feedback de cliente para analisar</label>
          <div className="sentiment-input-row">
            <input id="sentiment-input" aria-label="Feedback de cliente para analisar"
              type="text" value={input} disabled={result?.loading}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite um feedback de cliente..."
            />
            <button type="submit" disabled={result?.loading || input.trim().length < 3} className="button-primary">
              {result?.loading ? 'Analisando...' : 'Analisar'}
            </button>
          </div>
        </form>
        <div className="sentiment-response" aria-live="polite" aria-atomic="true">
          {result && !result.loading && (
            <p className="sentiment-result">
              <span>Categoria:</span>
              <strong>{result.category}</strong>
            </p>
          )}
          {error && <p role="status" className="sentiment-error">{error}</p>}
          {result?.loading && (
            <p className="sentiment-loading" role="status">
              <span className="sentiment-spinner" aria-hidden="true" />
              Classificando com IA...
            </p>
          )}
        </div>
        <p className="sentiment-caption">
          Exemplo funcional. Em produção, o modelo é ajustado ao vocabulário e contexto de cada cliente.
        </p>
      </div>
    </section>
  );
}
