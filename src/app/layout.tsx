import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const inter = localFont({
  src: './fonts/inter-latin.woff2',
  variable: '--font-inter',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MazyLabs | Dados, IA e Automação em Campinas',
  description:
    'Empresa de dados, inteligência artificial, automação e sistemas sob medida em Campinas. Diagnóstico, piloto, implantação e transferência de conhecimento.',
  metadataBase: new URL('https://www.mazylabs.com'),
  openGraph: {
    title: 'MazyLabs | Dados, IA e Automação em Campinas',
    description:
      'Dados, inteligência artificial, automação e sistemas sob medida para empresas de Campinas e região. Menos promessa, mais sistema funcionando.',
    url: 'https://www.mazylabs.com',
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
  alternates: { canonical: 'https://www.mazylabs.com' },
  icons: {
    icon: '/favicon.svg',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'MazyLabs',
  description: 'Empresa de dados, inteligência artificial, automação e sistemas sob medida para empresas de Campinas e região.',
  url: 'https://www.mazylabs.com',
  logo: 'https://www.mazylabs.com/favicon.svg',
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
    telephone: '+55-11-94541-0931',
    contactType: 'sales',
    availableLanguage: ['Portuguese', 'English'],
  },
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
      </head>
      <body className={`${inter.variable} min-h-screen relative`}>
        {children}
      </body>
    </html>
  );
}
