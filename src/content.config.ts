import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per product in src/content/products. The file name is the URL:
// jambcbt.md -> /products/jambcbt
const products = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      // Used in the page title: "[name]: [benefit] | Upperkai"
      benefit: z.string(),
      // One line, shown on cards
      tagline: z.string(),
      // Meta description, around 150 characters
      description: z.string(),
      status: z.enum(['available', 'coming-soon']),
      image: image(),
      imageAlt: z.string(),
      // schema.org applicationCategory, e.g. "EducationalApplication", "FinanceApplication"
      category: z.string(),
      operatingSystem: z.string(),
      // Where people get the app. Leave out until it exists.
      appUrl: z.url().optional(),
      // Only set a price you actually charge. Leave out otherwise.
      price: z.object({ amount: z.string(), currency: z.string() }).optional(),
      order: z.number().default(100),
    }),
});

export const collections = { products };
