import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MazyLabs | Dados, IA e Automação em Campinas',
  description:
    'Empresa de dados, inteligência artificial, automação e sistemas sob medida em Campinas. Diagnóstico, piloto, implantação e transferência de conhecimento.',
  metadataBase: new URL('https://mazylabs.com'),
  openGraph: {
    title: 'MazyLabs | Dados, IA e Automação em Campinas',
    description:
      'Dados, inteligência artificial, automação e sistemas sob medida para empresas de Campinas e região. Menos promessa, mais sistema funcionando.',
    url: 'https://mazylabs.com',
    siteName: 'MazyLabs',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MazyLabs | Dados, IA e Automação em Campinas',
    description:
      'Dados, inteligência artificial, automação e sistemas sob medida para empresas de Campinas e região.',
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
  description: 'Empresa de dados, inteligência artificial, automação e sistemas sob medida para empresas de Campinas e região.',
  url: 'https://mazylabs.com',
  logo: 'https://mazylabs.com/favicon.svg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Campinas',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  areaServed: [
    { '@type': 'City', name: 'Campinas' },
    { '@type': 'AdministrativeArea', name: 'Região Metropolitana de Campinas' },
  ],
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
    'Inteligência Artificial para Empresas',
    'Agentes de IA',
    'Dashboards e Pipelines de Dados',
  ],
  knowsAbout: ['Dados', 'Inteligência Artificial', 'Automação', 'Integração de APIs', 'Sistemas sob medida'],
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
        {children}
      </body>
    </html>
  );
}
