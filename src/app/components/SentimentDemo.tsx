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

const categoryColors: Record<Category, string> = {
  alegria: '#22c55e',
  gratidão: '#4ade80',
  confiança: '#06b6d4',
  entusiasmo: '#f59e0b',
  amor: '#ec4899',
  dúvida: '#eab308',
  frustração: '#f97316',
  raiva: '#ef4444',
  tristeza: '#6366f1',
  'crítica construtiva': '#8b5cf6',
  ceticismo: '#94a3b8',
};

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
    if (text.trim().length < 3) return;
    setError(null);
    setResult({ category: 'dúvida', loading: true });

    try {
      const category = await analyzeWithGemini(text);
      setResult({ category, loading: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado');
      setResult({ category: 'dúvida', loading: false });
    }
  };

  return (
    <section className="space-y-5 md:space-y-8">
      <div className="flex flex-col items-center text-center space-y-2 md:space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
          Prova Técnica Interativa
        </span>
        <h3 className="text-2xl md:text-3xl font-bold">Classificação de Sentimentos</h3>
        <p className="text-sm opacity-60 max-w-md">
          Digite um feedback de cliente e veja a categorização em tempo real.
        </p>
      </div>

      {/* Terminal */}
      <div className="max-w-2xl mx-auto rounded-xl shadow-2xl bg-[#1c1917] p-1 border border-white/10">
        <div className="h-full w-full rounded-lg bg-black/50 p-4 md:p-6 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <MazyLogo color="#c15f3c" className="w-6 h-6" />
            <span className="text-white font-mono text-xs">MazySentiment · Gemini 2.0 Flash</span>
          </div>

          {/* Examples */}
          <div className="flex flex-wrap gap-2">
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => { setInput(ex); analyze(ex); }}
                className="text-[10px] font-mono px-3 py-1.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
              >
                &ldquo;{ex}&rdquo;
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white/5 rounded-lg px-4 py-3">
              <span className="text-[#c15f3c] font-mono text-xs shrink-0">$&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && analyze(input)}
                placeholder="Digite um feedback de cliente..."
                className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-gray-600"
              />
            </div>
            <button
              onClick={() => analyze(input)}
              disabled={result?.loading}
              className="px-4 py-3 rounded-lg bg-[#c15f3c] text-white font-mono text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {result?.loading ? '...' : 'Analisar'}
            </button>
          </div>

          {/* Result */}
          {result && !result.loading && (
            <div className="mt-2 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-white font-mono text-xs opacity-50">Categoria:</span>
                <span
                  className="font-mono text-xs font-bold uppercase px-3 py-1 rounded-full"
                  style={{
                    color: categoryColors[result.category],
                    backgroundColor: `${categoryColors[result.category]}15`,
                    border: `1px solid ${categoryColors[result.category]}30`,
                  }}
                >
                  {result.category}
                </span>
              </div>
              {error && (
                <div className="mt-3 text-[10px] font-mono text-red-300/80">
                  {error}
                </div>
              )}
            </div>
          )}

          {result?.loading && (
            <div className="mt-2 p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-[#c15f3c] border-t-transparent rounded-full animate-spin" />
              <span className="text-white font-mono text-xs opacity-50">Classificando com IA...</span>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-[9px] font-mono text-gray-600 text-center mt-2">
            Demo simplificada. Em produção, usamos LLMs fine-tuned para contexto específico do cliente.
          </p>
        </div>
      </div>
    </section>
  );
}
