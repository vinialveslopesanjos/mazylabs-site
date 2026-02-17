'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className="w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:opacity-70"
      style={{ borderColor: 'var(--text)' }}
    >
      <div className={`w-3 h-3 rounded-full ${dark ? 'bg-[var(--color-bone)]' : 'bg-[var(--color-dark)]'}`} />
    </button>
  );
}
