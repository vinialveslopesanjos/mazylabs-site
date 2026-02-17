import MazyLogo from './components/MazyLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <MazyLogo color="var(--color-terracotta)" className="w-20 h-20 mb-8" />
      <h2 className="text-4xl font-bold tracking-tighter mb-4">404</h2>
      <p className="text-lg opacity-60 mb-8">Página não encontrada.</p>
      <a
        href="/"
        className="px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest text-white bg-[var(--color-terracotta)] hover:-translate-y-1 transition-all"
      >
        Voltar ao início
      </a>
    </div>
  );
}
