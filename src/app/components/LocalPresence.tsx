import { ArrowUpRight, MapPin } from 'lucide-react';

export default function LocalPresence() {
  return (
    <section aria-labelledby="campinas-title" className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-y py-12 md:py-20" style={{ borderColor: 'var(--border)' }}>
      <div className="lg:col-span-4">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--color-terracotta)]">
          <MapPin size={15} aria-hidden="true" />
          Campinas e região
        </div>
      </div>
      <div className="lg:col-span-8 space-y-6">
        <h2 id="campinas-title" className="text-3xl md:text-5xl font-bold tracking-tighter">
          Dados, IA e automação perto do seu negócio.
        </h2>
        <p className="text-base md:text-lg leading-relaxed opacity-70 max-w-3xl">
          A MazyLabs atende empresas de Campinas e da região metropolitana com diagnóstico, piloto e implantação. Construímos integrações, pipelines de dados, dashboards, agentes de IA, automações de processos e sistemas sob medida — com acompanhamento próximo e transferência de conhecimento.
        </p>
        <a href="/campinas" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[var(--color-terracotta)] transition-colors">
          Conheça nossa atuação em Campinas
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
