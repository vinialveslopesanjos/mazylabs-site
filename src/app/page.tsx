import Header from './components/Header';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import ProjectNetwork from './components/ProjectNetwork';
import SentimentDemo from './components/SentimentDemo';
import Manifesto from './components/Manifesto';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import LocalPresence from './components/LocalPresence';
import PageReveal from './components/PageReveal';

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      <main className="taste-flow">
        <Hero />
        <ClientLogos />
        <div data-reveal>
          <CaseStudies />
          <ProjectNetwork />
        </div>
        <div data-reveal><Services /></div>
        <div data-reveal><SentimentDemo /></div>
        <div data-reveal><Manifesto /></div>
        <div data-reveal><LocalPresence /></div>
        <div data-reveal><CTABanner /></div>
      </main>
      <Footer />
      <FloatingCTA />
      <PageReveal />
    </div>
  );
}
