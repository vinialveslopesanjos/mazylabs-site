import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: 'https://mazylabs.com', lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: 'https://mazylabs.com/campinas', lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://mazylabs.com/politica-de-privacidade', lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: 'https://mazylabs.com/termos-de-servico', lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: 'https://mazylabs.com/exclusao-de-dados', lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
