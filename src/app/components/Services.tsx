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
  { icon: Microscope, title: 'Diagnóstico e Piloto', desc: 'Em poucas semanas, tiramos uma ideia do papel e colocamos um piloto para testar valor de verdade antes de investir mais.' },
  { icon: Cpu, title: 'Atendimento e Operação Assistida', desc: 'Criamos assistentes para atendimento, vendas e tarefas internas com contexto do seu negócio e integração com seus sistemas.' },
  { icon: Briefcase, title: 'Previsão e Decisão', desc: 'Modelos para prever demanda, risco, churn e comportamento do cliente, com foco em decisão prática e retorno financeiro.' },
  { icon: EyeIcon, title: 'Automação com Imagem e Documentos', desc: 'Automatizamos leitura de documentos, conferência visual e processos operacionais com fotos, PDFs e vídeos.' },
  { icon: DatabaseIcon, title: 'Dados e Integrações', desc: 'Organizamos planilhas, sistemas e bases espalhadas para transformar informação solta em processo confiável e dado utilizável.' },
  { icon: GraduationCapIcon, title: 'Implantação com Handoff', desc: 'Entregamos documentação, treinamento e rotina operacional para seu time continuar sem ficar preso à Mazy.' },
];

export default function Services() {
  return (
    <section id="servicos" className="space-y-6 md:space-y-12">
      <div className="flex justify-between items-end border-b pb-4" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-xl md:text-2xl font-bold tracking-tighter max-w-xs">Soluções Reais para Problemas Reais.</h3>
        <span className="text-[10px] font-mono uppercase opacity-40 hidden md:block">Architecture & Deployment</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="p-5 md:p-8 rounded-xl border group hover:border-current transition-colors duration-300"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <service.icon className="mb-3 md:mb-6 opacity-80 text-[var(--color-terracotta)]" width={24} height={24} />
            <h4 className="font-bold text-sm md:text-lg mb-1 md:mb-2">{service.title}</h4>
            <p className="text-xs md:text-sm opacity-60 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
