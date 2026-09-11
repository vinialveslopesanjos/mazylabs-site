'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { ArrowRight, Briefcase, Cpu, Database, Eye, GraduationCap, Microscope } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  { icon: Microscope, title: 'Diagnóstico e Piloto', desc: 'Em poucas semanas, tiramos uma ideia do papel e colocamos um piloto para testar valor de verdade antes de investir mais.' },
  { icon: Cpu, title: 'Atendimento e Operação Assistida', desc: 'Criamos assistentes para atendimento, vendas e tarefas internas com contexto do seu negócio e integração com seus sistemas.' },
  { icon: Briefcase, title: 'Previsão e Decisão', desc: 'Modelos para prever demanda, risco, churn e comportamento do cliente, com foco em decisão prática e retorno financeiro.' },
  { icon: Eye, title: 'Automação com Imagem e Documentos', desc: 'Automatizamos leitura de documentos, conferência visual e processos operacionais com fotos, PDFs e vídeos.' },
  { icon: Database, title: 'Dados e Integrações', desc: 'Organizamos planilhas, sistemas e bases espalhadas para transformar informação solta em processo confiável e dado utilizável.' },
  { icon: GraduationCap, title: 'Implantação com Handoff', desc: 'Entregamos documentação, treinamento e rotina operacional para seu time continuar sem ficar preso à Mazy.' },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === 'ArrowDown') next = (index + 1) % services.length;
    else if (event.key === 'ArrowUp') next = (index - 1 + services.length) % services.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = services.length - 1;
    else return;
    event.preventDefault();
    buttons.current[next]?.focus();
  }

  return (
    <section id="servicos" aria-labelledby="services-heading" className={styles.section}>
      <h2 id="services-heading" className="section-title max-w-3xl">Soluções Reais para Problemas Reais.</h2>
      <div className={styles.explorer}>
        {services.map((service, index) => {
          const isActive = active === index;
          const Icon = service.icon;
          return (
            <div key={service.title} className={styles.entry}>
              <h3 className={styles.itemHeading} style={{ '--service-row': index + 1 } as CSSProperties}>
                <button
                  ref={(element) => { buttons.current[index] = element; }}
                  id={'service-trigger-' + index}
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isActive}
                  aria-disabled={isActive}
                  aria-controls={'service-panel-' + index}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => moveFocus(event, index)}
                >
                  <span>{service.title}</span>
                  <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </h3>
              <div
                id={'service-panel-' + index}
                role="region"
                aria-labelledby={'service-trigger-' + index}
                hidden={!isActive}
                className={styles.panel}
              >
                <Icon className={styles.serviceIcon} strokeWidth={1.1} aria-hidden="true" />
                <div className={styles.panelCopy}>
                  <p className={styles.panelTitle} aria-hidden="true">{service.title}</p>
                  <p className={styles.description}>{service.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
