import MazyLogo from './MazyLogo';

const WHATSAPP_URL = 'https://wa.me/5511979810832?text=Ol%C3%A1%21%20Vi%20o%20site%20da%20MazyLabs%20e%20gostaria%20de%20saber%20mais.';
const LINKEDIN_URL = 'https://www.linkedin.com/in/vin%C3%ADciusanjos/';

export default function Footer() {
  return (
    <footer id="contato" className="max-w-6xl mx-auto mt-40 py-12 border-t flex flex-col md:flex-row justify-between items-start gap-8" style={{ borderColor: 'var(--border)' }}>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MazyLogo color="var(--text)" className="w-6 h-6 opacity-50" />
          <span className="font-bold uppercase tracking-widest text-xs">MazyLabs</span>
        </div>
        <p className="text-[10px] opacity-40 max-w-xs">
          Feito com código limpo e café forte em São Paulo.<br />
          &copy; 2026 MazyLabs Ltda.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-12 text-[10px] uppercase tracking-widest font-bold opacity-60">
        <div className="flex flex-col gap-3">
          <span className="opacity-40 mb-1">Studio</span>
          <a href="#manifesto" className="hover:text-[var(--color-terracotta)] transition-colors">Sobre</a>
          <a href="#servicos" className="hover:text-[var(--color-terracotta)] transition-colors">Serviços</a>
        </div>
        <div className="flex flex-col gap-3">
          <span className="opacity-40 mb-1">Contato</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-terracotta)] transition-colors">LinkedIn</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-terracotta)] transition-colors">WhatsApp</a>
          <a href="mailto:vinicius.anjos@mazylabs.com" className="hover:text-[var(--color-terracotta)] transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
