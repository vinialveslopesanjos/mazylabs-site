import { Microscope, Cpu, Briefcase } from 'lucide-react';

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

const services = [
  { icon: Microscope, title: 'Prototipagem Rápida', desc: 'Da ideia ao PoC em semanas. Validamos a viabilidade técnica antes de você gastar o budget.' },
  { icon: Cpu, title: 'IA Generativa', desc: 'LLMs integrados a dados reais do seu negócio. Chatbots e assistentes que entendem seu contexto — não só o prompt.' },
  { icon: Briefcase, title: 'ML para Negócios', desc: 'Previsão de demanda, churn e fraude. Modelos que pagam a própria conta com ROI claro.' },
  { icon: EyeIcon, title: 'Visão Computacional', desc: 'Automação visual para indústria e varejo. OCR otimizado para documentos brasileiros.' },
  { icon: DatabaseIcon, title: 'Engenharia de Dados', desc: 'Data Lakes organizados. Transformamos o caos de planilhas em pipelines robustos.' },
  { icon: GraduationCapIcon, title: 'Educação In-Company', desc: 'Não criamos dependência. Treinamos seu time para manter o que construímos.' },
];

export default function Services() {
  return (
    <section id="servicos" className="space-y-12">
      <div className="flex justify-between items-end border-b pb-4" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-2xl font-bold tracking-tighter max-w-xs">Soluções Reais para Problemas Reais.</h3>
        <span className="text-[10px] font-mono uppercase opacity-40 hidden md:block">Architecture & Deployment</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="p-8 rounded-xl border group hover:border-current transition-colors duration-300"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <service.icon className="mb-6 opacity-80 text-[var(--color-terracotta)]" width={24} height={24} />
            <h4 className="font-bold text-lg mb-2">{service.title}</h4>
            <p className="text-sm opacity-60 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
