import MazyLogo from './MazyLogo';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="max-w-6xl mx-auto mb-20 flex justify-between items-center border-b pb-6" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-4">
        <MazyLogo color="var(--color-terracotta)" className="w-10 h-10" />
        <div className="flex flex-col leading-none">
          <h1 className="text-xl font-bold tracking-tighter uppercase">MazyLabs</h1>
          <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">Engenharia de IA</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest opacity-60">
          <a href="#manifesto" className="hover:text-[var(--color-terracotta)] transition-colors">Manifesto</a>
          <a href="#servicos" className="hover:text-[var(--color-terracotta)] transition-colors">Serviços</a>
          <a href="#contato" className="hover:text-[var(--color-terracotta)] transition-colors">Contato</a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
