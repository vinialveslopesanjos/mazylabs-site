'use client';

import { useState } from 'react';
import MazyLogo from './MazyLogo';
import { parseCategory } from '../lib/sentiment';
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


async function analyzeFeedback(text: string): Promise<Category> {
  const res = await fetch('/api/sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text.trim() }),
    signal: AbortSignal.timeout(35000),
  });
  if (res.status === 429) throw new Error('O limite de análises gratuitas foi atingido. Tente novamente mais tarde.');
  if (!res.ok) throw new Error('Não foi possível analisar agora. Tente novamente em instantes.');
  const data = await res.json();
  const category = typeof data.category === 'string' ? parseCategory(data.category) : null;
  if (!category) throw new Error('A IA não retornou uma categoria válida. Tente novamente.');
  return category;
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
      const category = await analyzeFeedback(text);
      setResult({ category, loading: false });
    } catch (cause) {
      setError(cause instanceof Error && cause.name === 'Error' ? cause.message : 'A análise demorou mais que o esperado. Tente novamente.');
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
              type="text" maxLength={1000} value={input} disabled={result?.loading}
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
