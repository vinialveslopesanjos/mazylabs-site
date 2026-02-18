export type Category =
  | 'alegria'
  | 'gratidão'
  | 'confiança'
  | 'entusiasmo'
  | 'amor'
  | 'dúvida'
  | 'frustração'
  | 'raiva'
  | 'tristeza'
  | 'crítica construtiva'
  | 'ceticismo';

export const CATEGORIES: Category[] = [
  'alegria',
  'gratidão',
  'confiança',
  'entusiasmo',
  'amor',
  'dúvida',
  'frustração',
  'raiva',
  'tristeza',
  'crítica construtiva',
  'ceticismo',
];

export const SYSTEM_PROMPT = `Você é um classificador de sentimentos para feedbacks de clientes em português brasileiro.
Dada uma frase, responda APENAS com uma das categorias abaixo — sem explicação, sem pontuação, só a categoria:

${CATEGORIES.join(', ')}

Regras:
- Escolha a categoria que melhor representa o sentimento principal da frase.
- Responda somente com a categoria, em minúsculas, exatamente como listado acima.`;

const normalizeCategoryText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const CATEGORY_INDEX = new Map(
  CATEGORIES.map((category) => [normalizeCategoryText(category), category])
);

export function parseCategory(raw: string): Category {
  const normalized = normalizeCategoryText(raw);
  for (const [key, category] of CATEGORY_INDEX) {
    if (normalized === key || normalized.includes(key)) {
      return category;
    }
  }
  return 'dúvida';
}
