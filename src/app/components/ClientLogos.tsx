/* eslint-disable @next/next/no-img-element */
const clients = [
  { name: 'Itaú', logo: '/logos/itau-unibanco.svg' },
  { name: 'PicPay', logo: '/logos/picpay-1.svg' },
  { name: 'Nubank', logo: '/logos/nubank-logo.svg' },
  { name: 'XP Inc.', logo: '/logos/xp-investimento-logo.svg' },
];

export default function ClientLogos() {
  const repeated = [...clients, ...clients, ...clients];

  return (
    <section className="overflow-hidden py-8 border-y" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-4 mb-6 px-4 max-w-6xl mx-auto">
        <div className="w-8 h-px bg-[var(--color-terracotta)]" />
        <span className="text-xs font-sans font-semibold uppercase tracking-widest opacity-65">
          Experiência profissional em grandes empresas
        </span>
      </div>
      <div className="relative">
        <div className="flex items-center animate-marquee whitespace-nowrap">
          {repeated.map((client, i) => (
            <img
              key={i}
              src={client.logo}
              alt={client.name}
              className="mx-12 h-8 md:h-10 w-auto opacity-30 hover:opacity-50 transition-opacity grayscale dark:invert"
            />
          ))}
        </div>
      </div>
      <p className="px-4 pt-6 max-w-6xl mx-auto text-sm opacity-65 leading-relaxed">As marcas representam experiência profissional. Não são clientes da MazyLabs.</p>
    </section>
  );
}
