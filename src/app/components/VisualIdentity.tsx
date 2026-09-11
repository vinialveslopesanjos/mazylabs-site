import MazyLogo from './MazyLogo';

export default function VisualIdentity() {
  return (
    <div className="identity-stage">
      <div className="identity-card aspect-[1.58] rounded-xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 bg-[#f4f3ee] text-[#1c1917]">
        <div className="absolute top-0 right-0 w-32 h-full bg-[#c15f3c] mix-blend-multiply opacity-90" />
        <div className="relative flex justify-between items-start gap-3">
          <MazyLogo color="#1c1917" className="w-10 h-10 sm:w-12 sm:h-12 shrink-0" />
          <div className="text-right">
            <p className="font-bold text-lg leading-none">MazyLabs</p>
            <p className="font-sans text-[10px] uppercase opacity-70 mt-1">Dados e Inteligência Artificial</p>
          </div>
        </div>
        <div className="relative">
          <p className="font-sans text-xs">+55 11 94541-0931</p>
          <div className="h-px w-full bg-black/10 my-4" />
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#9b4228]">MazyLabs Studio São Paulo</p>
        </div>
      </div>
    </div>
  );
}
