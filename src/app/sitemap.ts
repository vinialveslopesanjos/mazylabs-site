import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: 'https://www.mazylabs.com', lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: 'https://www.mazylabs.com/campinas', lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.mazylabs.com/servicos/automacao-ia-campinas', lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.mazylabs.com/servicos/dados-bi-campinas', lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.mazylabs.com/servicos/sistemas-sob-medida-campinas', lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.mazylabs.com/politica-de-privacidade', lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: 'https://www.mazylabs.com/termos-de-servico', lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: 'https://www.mazylabs.com/exclusao-de-dados', lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
