import Header from '../Header';
import Footer from '../Footer';

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageProps = {
  label: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
};

export default function LegalPage({ label, title, description, updatedAt, sections }: LegalPageProps) {
  return (
    <div className="p-4 sm:p-8">
      <Header />
      <main className="max-w-6xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-current/10 bg-white/5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-60">
                {label}
              </span>
            </div>
            <div className="space-y-5">
              <h1 className="text-4xl md:text-6xl font-bold leading-[0.92] tracking-tighter">
                {title}
              </h1>
              <p
                className="text-base md:text-lg opacity-70 leading-relaxed font-medium border-l-2 pl-5"
                style={{ borderColor: 'var(--color-terracotta)' }}
              >
                {description}
              </p>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest opacity-50">
              Atualizado em {updatedAt}
            </p>
          </div>

          <article className="lg:col-span-8">
            <div
              className="rounded-2xl border p-5 sm:p-8 md:p-10 space-y-10"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'color-mix(in srgb, var(--card) 84%, transparent)',
              }}
            >
              {sections.map((section) => (
                <section key={section.title} className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-sm md:text-base leading-relaxed opacity-75 max-w-[72ch]">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
