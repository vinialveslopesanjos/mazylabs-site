import Header from './components/Header';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import NetworkGraph from './components/NetworkGraph';
import SentimentDemo from './components/SentimentDemo';
import Manifesto from './components/Manifesto';
import VisualIdentity from './components/VisualIdentity';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';

export default function Home() {
  return (
    <div className="p-4 sm:p-8">
      <Header />
      <main className="max-w-6xl mx-auto space-y-16 md:space-y-32">
        <Hero />
        <ClientLogos />
        <Services />
        <CaseStudies />
        <NetworkGraph />
        <SentimentDemo />
        <Manifesto />
        <VisualIdentity />
        <CTABanner />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
