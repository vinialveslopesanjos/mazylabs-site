import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Manifesto from './components/Manifesto';
import VisualIdentity from './components/VisualIdentity';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="p-6 sm:p-8">
      <Header />
      <main className="max-w-6xl mx-auto space-y-32">
        <Hero />
        <Services />
        <Manifesto />
        <VisualIdentity />
      </main>
      <Footer />
    </div>
  );
}
