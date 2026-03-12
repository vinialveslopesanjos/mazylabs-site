import ItauGraph from './ItauGraph';

const smallCases = [
  {
    company: 'PicPay',
    logo: '/logos/picpay-1.svg',
    period: '2024',
    title: 'Modelo Preditivo de Churn',
    subtitle: 'Teste A/B validado em produção',
    description:
      'Modelo que antecipava quais clientes iam resgatar ou parar de investir, permitindo ações de retenção antes do vencimento.',
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
    subtitle: 'Validação de modelo de crédito em escala',
    description:
      'Testes A/B e análise estatística em larga escala para validar o modelo de concessão de crédito e medir impacto financeiro real antes do rollout.',
    metrics: [{ value: 'R$ 8M', label: 'impacto estimado' }],
  },
  {
    company: 'XP Inc.',
    logo: '/logos/xp-investimento-logo.svg',
    period: '2022',
    title: 'Inteligência Financeira',
    subtitle: 'Otimização de custos e risco',
    description:
      'Ferramentas para reduzir custos operacionais e controlar exposição ao risco de crédito, com dashboards práticos para tomada de decisão.',
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
              Identificação de risco em rede de transações
            </p>
            <p className="text-sm leading-relaxed opacity-70 max-w-md">
              Plataforma que mapeia relações entre pessoas e empresas em transações financeiras para identificar riscos ocultos. Gera resumos executivos automáticos e destaca entidades críticas em linguagem acessível para o time de compliance.
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
