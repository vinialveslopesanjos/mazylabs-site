import { Terminal, Code } from 'lucide-react';
import MazyLogo from './MazyLogo';

const WHATSAPP_URL = 'https://wa.me/5511979810832?text=Ol%C3%A1%21%20Vi%20o%20site%20da%20MazyLabs%20e%20gostaria%20de%20saber%20mais.';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-current/10 bg-white/5">
          <Terminal size={12} className="text-[var(--color-terracotta)]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">
            v2.0 // São Paulo Headquartered
          </span>
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.9] tracking-tighter">
          Engenharia de IA <br />
          <span className="opacity-40 italic font-serif">para quem constrói o futuro.</span>
        </h2>

        <p
          className="text-xl opacity-70 leading-relaxed max-w-lg font-medium border-l-2 pl-6"
          style={{ borderColor: 'var(--color-terracotta)' }}
        >
          Data science e machine learning de classe mundial, com pragmatismo brasileiro. Menos PowerPoint, mais GitHub.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest text-white transition-all hover:-translate-y-1 shadow-lg bg-[var(--color-terracotta)]"
          >
            Validar Ideia (PoC)
          </a>
          <a
            href="#servicos"
            className="px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest border transition-all hover:opacity-70 flex items-center gap-2"
            style={{ borderColor: 'var(--text)' }}
          >
            <Code size={16} />
            Ver Portfolio Técnico
          </a>
        </div>
      </div>

      <div className="lg:col-span-5 relative flex justify-center items-center h-full min-h-[400px]">
        <div className="absolute inset-0 border-2 opacity-10 rounded-2xl" style={{ borderColor: 'var(--text)' }} />
        <div className="absolute top-4 right-4 text-[10px] font-mono opacity-40">MAZY_SYS_ROOT</div>
        <div className="absolute bottom-4 left-4 text-[10px] font-mono opacity-40">LATENCY: 12ms</div>

        <MazyLogo color="var(--color-terracotta)" className="w-64 h-64 relative z-10 drop-shadow-2xl" />

        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>
    </section>
  );
}
