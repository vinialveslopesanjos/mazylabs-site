import MazyLogo from './MazyLogo';

export default function VisualIdentity() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Visual Identity System</span>
        <h3 className="text-3xl font-bold">Estética de Código</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Business Card Mockup */}
        <div className="aspect-[1.58] rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 bg-[#f4f3ee] text-[#1c1917]">
          <div className="absolute top-0 right-0 w-32 h-full bg-[#c15f3c] mix-blend-multiply opacity-90" />
          <div className="relative z-10 flex justify-between items-start">
            <MazyLogo color="#1c1917" className="w-12 h-12" />
            <div className="text-right">
              <p className="font-bold text-lg leading-none">Vinícius Anjos</p>
              <p className="font-mono text-[10px] uppercase opacity-60 mt-1">Founder & AI Engineer</p>
            </div>
          </div>
          <div className="relative z-10">
            <p className="font-mono text-xs">viniciusanjos.mazylabs@gmail.com</p>
            <p className="font-mono text-xs">+55 11 97981-0832</p>
            <div className="h-px w-full bg-black/10 my-4" />
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#c15f3c]">MazyLabs Studio São Paulo</p>
          </div>
        </div>

        {/* Console / Terminal Mockup */}
        <div className="aspect-[1.58] rounded-xl shadow-2xl bg-[#1c1917] p-1 border border-white/10">
          <div className="h-full w-full rounded-lg bg-black/50 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <MazyLogo color="#c15f3c" className="w-6 h-6" />
              <span className="text-white font-mono text-xs">MazyConsole v1.0</span>
            </div>
            <div className="flex-1 font-mono text-[10px] text-gray-400 space-y-2">
              <p><span className="text-[#c15f3c]">root@mazy:~$</span> initiate_sequence --target=optimization</p>
              <p className="text-white">[OK] Loading neural weights...</p>
              <p className="text-white">[OK] Connecting to Brazilian Data Lake...</p>
              <p className="text-white">[OK] ROI Analysis complete.</p>
              <div className="mt-4 p-3 bg-[#c15f3c]/10 border-l-2 border-[#c15f3c] text-[#c15f3c]">
                Insight found: Cost reduction opportunity detected (23%).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
