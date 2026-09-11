import { ArrowUpRight } from 'lucide-react';
import { WHATSAPP_URL } from '../lib/site';
import VisualIdentity from './VisualIdentity';

export default function CTABanner() {
  return (
    <section className="contact-composition" aria-labelledby="project-contact-title">
      <div className="contact-copy">
        <h2 id="project-contact-title" className="section-title">Pronto para<br /><span className="font-serif italic">começar?</span></h2>
        <p className="section-lead">Conte seu desafio. A primeira conversa é por nossa conta.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="button-primary">
          Conversar sobre um projeto <ArrowUpRight size={19} aria-hidden="true" />
        </a>
      </div>
      <VisualIdentity />
    </section>
  );
}
