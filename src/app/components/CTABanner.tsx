const WHATSAPP_URL =
  'https://wa.me/5511979810832?text=Ol%C3%A1%21%20Vi%20o%20site%20da%20MazyLabs%20e%20gostaria%20de%20saber%20mais.';

export default function CTABanner() {
  return (
    <section className="max-w-6xl mx-auto rounded-2xl bg-[var(--color-terracotta)] p-6 md:p-16 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
      <div className="space-y-2 text-center md:text-left">
        <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tighter">
          Pronto para começar?
        </h3>
        <p className="text-white/70 font-medium max-w-md">
          Conte seu desafio. A primeira conversa é por nossa conta.
        </p>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest bg-white text-[var(--color-dark)] transition-all hover:-translate-y-1 shadow-lg shrink-0"
      >
        Agende uma Call
      </a>
    </section>
  );
}
