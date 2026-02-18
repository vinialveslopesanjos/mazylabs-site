export default function Manifesto() {
  return (
    <section id="manifesto" className="grid grid-cols-1 md:grid-cols-2 gap-0 border rounded-xl md:rounded-3xl overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <div className="p-6 md:p-16 flex flex-col justify-center space-y-6 bg-[var(--color-terracotta)]">
        <div className="w-12 h-1 bg-white/20 mb-4" />
        <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tighter">
          &ldquo;Labs&rdquo; não é marketing.<br />É método.
        </h3>
        <p className="text-white/80 font-medium max-w-sm">
          A MazyLabs nasceu da insatisfação com promessas vazias. Somos engenheiros e cientistas obcecados por rigor. Se não podemos medir, não entregamos.
        </p>
        <div className="pt-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Manifesto 01</span>
        </div>
      </div>

      <div className="p-6 md:p-16 flex flex-col justify-center space-y-8" style={{ backgroundColor: 'var(--card)' }}>
        <div className="space-y-4">
          {[
            { n: '1', title: 'Transparência Radical', desc: 'Explicamos o que funciona e o que não funciona. Sem caixa preta.' },
            { n: '2', title: 'Preço Justo & Real', desc: 'Soluções dimensionadas para a realidade do PME brasileiro.' },
            { n: '3', title: 'Código Aberto', desc: 'Contribuímos com a comunidade. Confiança se constrói publicamente.' },
          ].map((item) => (
            <div key={item.n} className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1 bg-[var(--color-stone)]">
                {item.n}
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wide mb-1">{item.title}</h4>
                <p className="text-xs opacity-60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
