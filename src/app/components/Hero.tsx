import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import MazyLogo from './MazyLogo';
import { WHATSAPP_URL } from '../lib/site';

export default function Hero() {
  return (
    <section className="home-intro taste-hero" aria-labelledby="home-title">
      <div className="taste-hero-copy">
        <h1 id="home-title">
          Dados, IA e<br />sistemas <span>sob medida</span>
        </h1>
        <p className="taste-hero-support font-serif italic">
          para empresas que precisam operar melhor.
        </p>
        <p className="taste-hero-description">
          Ajudamos pequenas e médias empresas de Campinas e região a organizar dados, automatizar tarefas do dia a dia e colocar sistemas em produção.
        </p>
        <div className="taste-hero-actions">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="button-primary">
            Entender se conseguimos ajudar
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href="#cases" className="taste-text-link">
            Ver casos reais <ArrowDownRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="taste-hero-art">
        <Image
          src="/images/mazy-geometry-hero.webp"
          alt="Composição de peças em terracota, metal e vidro conectadas em uma única estrutura."
          width={1120}
          height={1400}
          sizes="(max-width: 767px) 100vw, 50vw"
          priority
          className="taste-hero-image"
        />
        <MazyLogo color="#1c1917" className="taste-hero-mark" />
      </div>
    </section>
  );
}
