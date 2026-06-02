import type { Metadata } from 'next';
import './globals.css';
import VantaBackground from './components/VantaBackground';

export const metadata: Metadata = {
  title: 'MazyLabs | Dados, IA e Sistemas sob Medida - São Paulo',
  description:
    'MazyLabs: automações, integrações e soluções de dados sob medida para empresas que precisam operar melhor. Diagnóstico, piloto, implantação e handoff em São Paulo.',
  metadataBase: new URL('https://mazylabs.com'),
  openGraph: {
    title: 'MazyLabs | Dados, IA e Sistemas sob Medida',
    description:
      'Automações, integrações e soluções de dados sob medida para empresas que precisam operar melhor. Menos promessa, mais sistema funcionando.',
    url: 'https://mazylabs.com',
    siteName: 'MazyLabs',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MazyLabs | Dados, IA e Sistemas sob Medida',
    description:
      'Automações, integrações e soluções de dados sob medida para empresas que precisam operar melhor.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://mazylabs.com' },
  icons: {
    icon: '/favicon.svg',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MazyLabs',
  description: 'Automações, integrações e soluções de dados sob medida para empresas que precisam operar melhor.',
  url: 'https://mazylabs.com',
  logo: 'https://mazylabs.com/favicon.svg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-11-97981-0832',
    contactType: 'sales',
    availableLanguage: ['Portuguese', 'English'],
  },
  sameAs: ['https://www.linkedin.com/in/vin%C3%ADciusanjos/'],
  serviceType: [
    'Automação de Processos',
    'Integração de Dados',
    'Sistemas sob Medida',
    'Análise Preditiva',
    'Atendimento Assistido',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen relative">
        <VantaBackground />
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[var(--vanta-overlay)] backdrop-blur-[1.5px]" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
