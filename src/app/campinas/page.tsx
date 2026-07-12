import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';

const WHATSAPP_URL = 'https://wa.me/5511979810832?text=Ol%C3%A1%21%20Procuro%20uma%20empresa%20de%20dados%2C%20IA%20ou%20automa%C3%A7%C3%A3o%20em%20Campinas.';

export const metadata: Metadata = {
  title: 'Empresa de Dados, IA e Automação em Campinas | MazyLabs',
  description: 'Soluções de dados, inteligência artificial, automação, integrações e sistemas sob medida para empresas de Campinas e região. Converse com a MazyLabs.',
  alternates: { canonical: 'https://www.mazylabs.com/campinas' },
};

const services = [
  ['Dados e dashboards', 'Organização de fontes, pipelines, indicadores e painéis para transformar informações dispersas em decisões confiáveis.'],
  ['Inteligência artificial', 'Agentes de IA, processamento de documentos e soluções conectadas aos dados e processos reais da empresa.'],
  ['Automação de processos', 'Redução de tarefas manuais com integrações entre sistemas, APIs e fluxos acompanhados de ponta a ponta.'],
  ['Sistemas sob medida', 'Aplicações enxutas para operações que não cabem bem em ferramentas genéricas ou planilhas improvisadas.'],
];

const faq = [
  ['A MazyLabs atende presencialmente em Campinas?', 'Atendemos empresas de Campinas e região com reuniões presenciais quando o projeto pede proximidade, além de diagnóstico e acompanhamento remoto.'],
  ['Vocês trabalham com pequenas e médias empresas?', 'Sim. Estruturamos o trabalho em diagnóstico, piloto e implantação para validar valor antes de ampliar o investimento.'],
  ['Que tipo de projeto vocês desenvolvem?', 'Integrações, pipelines e análise de dados, dashboards, automações, agentes de IA, processamento de documentos e sistemas sob medida.'],
];

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text },
  })),
};

export default function CampinasPage() {
  return (
    <div className="p-4 sm:p-8">
      <Header />
      <main className="max-w-6xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
        <section className="max-w-4xl py-8 md:py-20 space-y-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-terracotta)]">Tecnologia em Campinas, SP</p>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95]">Dados, IA e automação para empresas de Campinas.</h1>
          <p className="text-lg md:text-2xl leading-relaxed opacity-70 max-w-3xl">A MazyLabs transforma processos manuais e dados dispersos em sistemas que funcionam no dia a dia. Atuamos com diagnóstico, piloto, implantação e transferência de conhecimento.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex px-7 py-4 rounded-lg bg-[var(--color-terracotta)] text-white font-bold text-sm uppercase tracking-widest hover:-translate-y-1 transition-transform shadow-lg">Falar sobre meu desafio</a>
        </section>

        <section aria-labelledby="solucoes-title" className="py-12 md:py-20 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 id="solucoes-title" className="text-3xl md:text-5xl font-bold tracking-tighter mb-10">Soluções conectadas à sua operação</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map(([title, description], index) => (
              <article key={title} className="rounded-2xl p-6 md:p-8 bg-[var(--card)] border" style={{ borderColor: 'var(--border)' }}>
                <span className="font-mono text-xs opacity-40">0{index + 1}</span>
                <h3 className="text-xl md:text-2xl font-bold mt-5 mb-3">{title}</h3>
                <p className="leading-relaxed opacity-65">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="metodo-title" className="py-12 md:py-20 grid lg:grid-cols-12 gap-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 id="metodo-title" className="lg:col-span-5 text-3xl md:text-5xl font-bold tracking-tighter">Proximidade sem promessa vazia.</h2>
          <div className="lg:col-span-7 space-y-5 text-lg leading-relaxed opacity-70">
            <p>Começamos entendendo o processo, os dados disponíveis e a decisão de negócio que precisa melhorar. O piloto reduz risco e produz evidência antes da implantação completa.</p>
            <p>Atendemos Campinas e a região metropolitana, com contato direto durante o projeto e documentação para que sua equipe mantenha autonomia depois da entrega.</p>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="py-12 md:py-20 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 id="faq-title" className="text-3xl md:text-5xl font-bold tracking-tighter mb-10">Perguntas frequentes</h2>
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {faq.map(([question, answer]) => (
              <details key={question} className="py-5 group">
                <summary className="font-bold text-lg cursor-pointer list-none flex justify-between gap-4">{question}<span aria-hidden="true" className="text-[var(--color-terracotta)] group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-4 max-w-3xl leading-relaxed opacity-70">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
