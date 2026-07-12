import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FloatingCTA from '../../components/FloatingCTA';

const WHATSAPP_URL = 'https://wa.me/5511979810832?text=Ol%C3%A1%21%20Encontrei%20a%20MazyLabs%20pesquisando%20solu%C3%A7%C3%B5es%20de%20tecnologia%20em%20Campinas.';

const pages = {
  'automacao-ia-campinas': {
    eyebrow: 'Automação e inteligência artificial em Campinas',
    title: 'Automação e IA aplicadas à operação da sua empresa.',
    description: 'Projetamos automações e soluções de inteligência artificial conectadas aos processos e sistemas reais de empresas de Campinas e região.',
    problem: 'Tarefas repetitivas, documentos acumulados e atendimentos sem contexto consomem tempo e criam erros. A tecnologia só ajuda quando entra no fluxo real de trabalho — com limites, revisão humana e métricas claras.',
    outcomes: ['Agentes de IA conectados a dados e ferramentas internas', 'Leitura, classificação e extração de dados de documentos', 'Automação de atendimento, triagem e rotinas operacionais', 'Integrações com APIs, WhatsApp, CRMs e sistemas existentes'],
    questions: [
      ['IA serve para qualquer processo?', 'Não. Primeiro avaliamos volume, repetição, risco e qualidade dos dados. Quando uma automação tradicional é mais adequada, recomendamos a solução mais simples.'],
      ['É possível começar pequeno?', 'Sim. Um piloto limitado valida qualidade, custo e impacto antes da implantação em escala.'],
      ['A equipe perde o controle do processo?', 'Não. Definimos pontos de revisão humana, registros de execução e documentação para que sua equipe mantenha autonomia.'],
    ],
  },
  'dados-bi-campinas': {
    eyebrow: 'Dados, BI e dashboards em Campinas',
    title: 'Dados organizados para decisões que não dependem de improviso.',
    description: 'Integramos fontes, construímos pipelines e criamos dashboards confiáveis para empresas de Campinas e região.',
    problem: 'Quando números vivem em planilhas, sistemas e relatórios diferentes, a equipe gasta energia conciliando versões em vez de decidir. Organizamos a origem, a transformação e a apresentação dos dados para que cada indicador seja rastreável.',
    outcomes: ['Integração de planilhas, bancos de dados, ERPs e APIs', 'Pipelines com validação, histórico e monitoramento', 'Dashboards operacionais e executivos', 'Modelos de previsão e análise orientados à decisão'],
    questions: [
      ['Vocês substituem as ferramentas que já usamos?', 'Nem sempre. Muitas vezes conectamos e organizamos as ferramentas existentes, evitando uma migração desnecessária.'],
      ['É preciso ter um grande volume de dados?', 'Não. O ponto de partida pode ser pequeno; o importante é ter uma decisão concreta e dados minimamente consistentes.'],
      ['Como garantem que o dashboard está correto?', 'Documentamos regras de cálculo, validamos amostras com a operação e criamos testes para transformações críticas.'],
    ],
  },
  'sistemas-sob-medida-campinas': {
    eyebrow: 'Desenvolvimento de sistemas em Campinas',
    title: 'Sistemas sob medida para operações que não cabem em ferramentas genéricas.',
    description: 'Desenvolvemos aplicações, portais e integrações para processos específicos de empresas de Campinas e região.',
    problem: 'Planilhas frágeis e adaptações intermináveis em softwares genéricos criam retrabalho. Um sistema sob medida faz sentido quando o processo é estratégico, recorrente e precisa de regras, permissões e integrações próprias.',
    outcomes: ['Aplicações web para fluxos internos e atendimento', 'Portais, painéis e ferramentas operacionais', 'Integração entre sistemas legados e serviços modernos', 'Documentação, treinamento e transferência de conhecimento'],
    questions: [
      ['Como saber se preciso de um sistema sob medida?', 'Comparamos o custo e as limitações das ferramentas prontas com o valor de um fluxo próprio. Só recomendamos desenvolvimento quando a diferença é justificável.'],
      ['O sistema fica preso à MazyLabs?', 'Não. Entregamos documentação, código e conhecimento operacional conforme o escopo acordado.'],
      ['Vocês dão manutenção depois da entrega?', 'Podemos combinar acompanhamento e evolução, mas estruturamos a entrega para que o cliente não dependa obrigatoriamente da MazyLabs.'],
    ],
  },
} as const;

type ServiceSlug = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as ServiceSlug];
  if (!page) return {};
  return {
    title: `${page.eyebrow} | MazyLabs`,
    description: page.description,
    alternates: { canonical: `https://www.mazylabs.com/servicos/${slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as ServiceSlug];
  if (!page) notFound();

  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.questions.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
  };

  return (
    <div className="p-4 sm:p-8">
      <Header />
      <main className="max-w-6xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
        <nav aria-label="Navegação estrutural" className="text-xs font-mono uppercase tracking-widest opacity-50 py-4">
          <a href="/" className="hover:text-[var(--color-terracotta)]">Início</a> / <a href="/campinas" className="hover:text-[var(--color-terracotta)]">Campinas</a> / Serviço
        </nav>

        <section className="max-w-5xl py-10 md:py-20 space-y-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-terracotta)]">{page.eyebrow}</p>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95]">{page.title}</h1>
          <p className="text-lg md:text-2xl leading-relaxed opacity-70 max-w-3xl">{page.description}</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex px-7 py-4 rounded-lg bg-[var(--color-terracotta)] text-white font-bold text-sm uppercase tracking-widest hover:-translate-y-1 transition-transform shadow-lg">Conversar com um especialista</a>
        </section>

        <section className="py-12 md:py-20 border-t grid lg:grid-cols-12 gap-8" style={{ borderColor: 'var(--border)' }}>
          <h2 className="lg:col-span-4 text-3xl md:text-4xl font-bold tracking-tighter">O problema que resolvemos</h2>
          <p className="lg:col-span-8 text-lg md:text-xl leading-relaxed opacity-70">{page.problem}</p>
        </section>

        <section aria-labelledby="entregas-title" className="py-12 md:py-20 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 id="entregas-title" className="text-3xl md:text-5xl font-bold tracking-tighter mb-10">O que podemos construir</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {page.outcomes.map((outcome, index) => (
              <div key={outcome} className="p-6 md:p-8 rounded-2xl bg-[var(--card)] border" style={{ borderColor: 'var(--border)' }}>
                <span className="font-mono text-xs text-[var(--color-terracotta)]">0{index + 1}</span>
                <h3 className="text-xl font-bold mt-5">{outcome}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 md:py-20 border-t grid lg:grid-cols-12 gap-8" style={{ borderColor: 'var(--border)' }}>
          <h2 className="lg:col-span-4 text-3xl md:text-4xl font-bold tracking-tighter">Como começamos</h2>
          <div className="lg:col-span-8 space-y-5 text-lg leading-relaxed opacity-70">
            <p>Mapeamos o processo, as pessoas envolvidas, os sistemas atuais e a métrica que precisa melhorar. A partir disso, definimos um piloto pequeno o suficiente para reduzir risco e completo o bastante para gerar evidência.</p>
            <p>Com o piloto validado, implantamos, documentamos e transferimos o conhecimento. Atendemos empresas de Campinas e da região metropolitana com proximidade quando o projeto exige trabalho presencial.</p>
          </div>
        </section>

        <section aria-labelledby="faq-service-title" className="py-12 md:py-20 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 id="faq-service-title" className="text-3xl md:text-5xl font-bold tracking-tighter mb-10">Perguntas frequentes</h2>
          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {page.questions.map(([question, answer]) => (
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
