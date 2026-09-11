const principles = [
  { title: 'Transparência Radical', desc: 'Explicamos o que funciona e o que não funciona. Sem caixa preta.' },
  { title: 'Preço Justo & Real', desc: 'Soluções dimensionadas para a realidade do PME brasileiro.' },
  { title: 'Cliente Autônomo', desc: 'Entregamos projeto com começo, meio e fim. Seu time opera sozinho depois.' },
];

export default function Manifesto() {
  return (
    <section id="manifesto" aria-labelledby="manifesto-heading" className="scroll-mt-8 border-t pt-12 md:pt-20" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-4xl">
        <h2 id="manifesto-heading" className="font-serif text-[clamp(2.5rem,5.4vw,4.75rem)] font-normal leading-[1.12] tracking-[-0.045em] text-balance" style={{ color: 'var(--text)' }}>
          Entender o problema vem antes do código.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed md:mt-8 md:text-xl" style={{ color: 'var(--muted, var(--text))' }}>
          A MazyLabs nasceu da insatisfação com promessas vazias. Somos engenheiros e cientistas obcecados por rigor. Se não podemos medir, não entregamos.
        </p>
      </div>
      <div className="mt-12 md:mt-16 md:ml-[17%]">
        {principles.map((principle) => (
          <div key={principle.title} className="grid gap-3 border-t py-7 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-10 md:py-9" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-medium tracking-tight md:text-2xl" style={{ color: 'var(--accent-text, var(--color-terracotta))' }}>{principle.title}</h3>
            <p className="max-w-md text-base leading-relaxed md:text-lg" style={{ color: 'var(--muted, var(--text))' }}>{principle.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
