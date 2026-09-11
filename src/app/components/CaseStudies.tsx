import ItauGraph from './ItauGraph';
import './case-studies.css';

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
    <section id="cases" className="case-studies" aria-labelledby="cases-title">
      <div className="case-studies-heading">
        <h2 id="cases-title" className="section-title">Casos de Sucesso.</h2>
        <p className="case-studies-caption">Real Projects &amp; Metrics</p>
      </div>

      <div className="case-composition">
        <article className="case-panel case-panel-itau" aria-labelledby="case-itau-title">
          <div className="case-company">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/itau-unibanco.svg" alt="Itaú" className="case-logo-itau" />
            <span className="case-period">2024</span>
          </div>

          <div className="case-itau-copy">
            <h3 id="case-itau-title">Plataforma de Grafo de Risco</h3>
            <p className="case-subtitle">Identificação de risco em rede de transações</p>
            <p className="case-description">
              Plataforma que mapeia relações entre pessoas e empresas em transações financeiras para identificar riscos ocultos. Gera resumos executivos automáticos e destaca entidades críticas em linguagem acessível para o time de compliance.
            </p>
          </div>

          <div className="case-graph">
            <ItauGraph />
          </div>
        </article>

        {smallCases.map((c, i) => (
          <article
            key={c.company}
            className={`case-panel case-panel-${['picpay', 'nubank', 'xp'][i]}`}
            aria-labelledby={`case-${i}-title`}
          >
            <div className="case-company">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={c.company}
                className={`case-logo ${c.company === 'XP Inc.' ? 'dark:invert' : ''}`}
              />
              <span className="case-period">{c.period}</span>
            </div>

            <div className="case-project">
              <h3 id={`case-${i}-title`}>{c.title}</h3>
              <p className="case-subtitle">{c.subtitle}</p>
              <p className="case-description">{c.description}</p>
            </div>

            {c.metrics.length > 0 && (
              <dl className="case-metrics">
                {c.metrics.map((m) => (
                  <div key={m.label} className="case-metric">
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
