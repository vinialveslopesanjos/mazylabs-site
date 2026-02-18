import ItauGraph from './ItauGraph';

const smallCases = [
  {
    company: 'PicPay',
    logo: '/logos/picpay-1.svg',
    period: '2024',
    title: 'Modelo Preditivo de Churn',
    subtitle: 'Teste A/B validado em produção',
    description:
      'Modelo preditivo que identificava clientes com maior probabilidade de resgatar ou não reinvestir, permitindo ações direcionadas antes do vencimento.',
    metrics: [
      { value: '2x', label: 'reinvestimento' },
      { value: '13x', label: 'captação' },
      { value: '-57%', label: 'resgate' },
    ],
  },
  {
    company: 'Nubank',
    logo: '/logos/nubank-logo.svg',
    period: '2023',
    title: 'Concessão de Crédito',
    subtitle: 'Análise estatística com +1M clientes',
    description:
      'Análise estatística e testes A/B com população superior a 1 milhão de clientes para avaliar a viabilidade do modelo de concessão de crédito.',
    metrics: [{ value: 'R$ 8M', label: 'impacto estimado' }],
  },
  {
    company: 'XP Inc.',
    logo: '/logos/xp-investimento-logo.svg',
    period: '2022',
    title: 'Inteligência Financeira',
    subtitle: 'Otimização de custos e risco',
    description:
      'Ferramentas analíticas para otimização de custos fixos e variáveis, com suporte à gestão de exposição ao risco de crédito corporativo.',
    metrics: [],
  },
];

export default function CaseStudies() {
  return (
    <section id="cases" className="space-y-6 md:space-y-12">
      <div
        className="flex justify-between items-end border-b pb-4"
        style={{ borderColor: 'var(--border)' }}
      >
        <h3 className="text-xl md:text-2xl font-bold tracking-tighter max-w-xs">
          Casos de Sucesso.
        </h3>
        <span className="text-[10px] font-mono uppercase opacity-40 hidden md:block">
          Real Projects & Metrics
        </span>
      </div>

      {/* Itaú — Hero Case */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: 'var(--color-dark)', borderColor: 'var(--color-terracotta)', color: 'var(--color-bone)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left: content */}
          <div className="p-4 md:p-12 flex flex-col justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:gap-4">
              <img
                src="/logos/itau-unibanco.svg"
                alt="Itaú"
                className="h-8 md:h-10 w-auto opacity-90"
              />
              <span className="text-[10px] font-mono uppercase opacity-50">2024</span>
            </div>
            <h4 className="text-xl md:text-3xl font-bold tracking-tighter">
              Plataforma de Grafo de Risco
            </h4>
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-terracotta)' }}
            >
              Graph Analytics + IA Generativa
            </p>
            <p className="text-sm leading-relaxed opacity-70 max-w-md">
              Rede relacional onde nós representam pessoas físicas e jurídicas e arestas representam transações em contexto de risco financeiro. IA interpreta o grafo para gerar resumos executivos e identificar entidades críticas via linguagem natural.
            </p>
          </div>

          {/* Right: interactive mini-graph */}
          <div className="p-4 md:p-6">
            <ItauGraph />
          </div>
        </div>
      </div>

      {/* PicPay, Nubank, XP — Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {smallCases.map((c, i) => (
          <div
            key={i}
            className="p-5 md:p-8 rounded-xl border flex flex-col gap-4 md:gap-6 transition-colors duration-300"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Company header */}
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={c.company}
                className={`h-7 w-auto opacity-70 ${c.company === 'XP Inc.' ? 'dark:invert' : ''}`}
              />
              <span className="text-[10px] font-mono uppercase opacity-50">
                {c.period}
              </span>
            </div>

            {/* Project */}
            <div className="flex-1">
              <h4 className="font-bold text-sm md:text-lg mb-1">{c.title}</h4>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-2 md:mb-3"
                style={{ color: 'var(--color-terracotta)' }}
              >
                {c.subtitle}
              </p>
              <p className="text-xs md:text-sm leading-relaxed opacity-60">
                {c.description}
              </p>
            </div>

            {/* Metrics */}
            {c.metrics.length > 0 && (
              <div
                className="flex justify-between gap-2 pt-3 md:pt-4 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                {c.metrics.map((m, j) => (
                  <div key={j} className="flex-1 min-w-0">
                    <p
                      className="text-xl md:text-2xl font-bold tracking-tighter"
                      style={{ color: 'var(--color-terracotta)' }}
                    >
                      {m.value}
                    </p>
                    <p className="text-[10px] font-mono uppercase opacity-50 leading-tight">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
