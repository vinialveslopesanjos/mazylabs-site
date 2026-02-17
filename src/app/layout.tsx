import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MazyLabs | Engenharia de IA - São Paulo',
  description:
    'MazyLabs: engenharia de inteligência artificial sob medida. Prototipagem rápida, IA generativa, machine learning para negócios, visão computacional e engenharia de dados em São Paulo.',
  metadataBase: new URL('https://mazylabs.vercel.app'),
  openGraph: {
    title: 'MazyLabs | Engenharia de IA',
    description:
      'Data science e machine learning de classe mundial, com pragmatismo brasileiro. Menos PowerPoint, mais GitHub.',
    url: 'https://mazylabs.vercel.app',
    siteName: 'MazyLabs',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MazyLabs | Engenharia de IA',
    description:
      'Data science e machine learning de classe mundial, com pragmatismo brasileiro.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://mazylabs.vercel.app' },
  icons: {
    icon: '/favicon.svg',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MazyLabs',
  description: 'Engenharia de inteligência artificial sob medida. Prototipagem rápida, IA generativa, ML para negócios.',
  url: 'https://mazylabs.vercel.app',
  logo: 'https://mazylabs.vercel.app/favicon.svg',
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
    'Inteligência Artificial',
    'Machine Learning',
    'IA Generativa',
    'Visão Computacional',
    'Engenharia de Dados',
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
