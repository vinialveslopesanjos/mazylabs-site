'use client';

import { useState } from 'react';
import MazyLogo from './MazyLogo';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="max-w-6xl mx-auto mb-10 md:mb-20 flex flex-wrap justify-between items-center border-b pb-6"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-4">
        <MazyLogo color="var(--color-terracotta)" className="w-10 h-10" />
        <div className="flex flex-col leading-none">
          <h1 className="text-xl font-bold tracking-tighter uppercase">MazyLabs</h1>
          <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">Engenharia de IA</span>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <nav className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest opacity-60">
          <a href="#manifesto" className="hover:text-[var(--color-terracotta)] transition-colors">Manifesto</a>
          <a href="#servicos" className="hover:text-[var(--color-terracotta)] transition-colors">Serviços</a>
          <a href="#contato" className="hover:text-[var(--color-terracotta)] transition-colors">Contato</a>
        </nav>
        <ThemeToggle />
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-md border opacity-60 hover:opacity-100 transition-opacity"
          style={{ borderColor: 'var(--border)' }}
          aria-label="Menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? (
              <>
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </>
            ) : (
              <>
                <line x1="2" y1="4" x2="14" y2="4" />
                <line x1="2" y1="8" x2="14" y2="8" />
                <line x1="2" y1="12" x2="14" y2="12" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <nav className="w-full mt-4 pt-4 border-t md:hidden flex flex-col gap-3 text-xs font-bold uppercase tracking-widest opacity-60" style={{ borderColor: 'var(--border)' }}>
          <a href="#manifesto" onClick={() => setOpen(false)} className="hover:text-[var(--color-terracotta)] transition-colors py-1">Manifesto</a>
          <a href="#servicos" onClick={() => setOpen(false)} className="hover:text-[var(--color-terracotta)] transition-colors py-1">Serviços</a>
          <a href="#contato" onClick={() => setOpen(false)} className="hover:text-[var(--color-terracotta)] transition-colors py-1">Contato</a>
        </nav>
      )}
    </header>
  );
}
