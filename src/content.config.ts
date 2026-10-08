import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { languages, statuses } from './lib/constants.ts';
import { exampleCategoryIds } from './lib/examples.ts';

const language = z.enum(Object.keys(languages) as [keyof typeof languages]);

const link = z.object({
  label: z.string(),
  href: z.string(),
  description: z.string().optional(),
});

const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    navLabel: z.string().optional(),
    order: z.number().default(100),
    status: z.enum(Object.keys(statuses) as [keyof typeof statuses]).default('outline'),
    languages: z.array(language).default([]),
    links: z.array(link).default([]),
    gallery: z.boolean().default(false),
    hero: z
      .object({
        eyebrow: z.string().optional(),
        tagline: z.string(),
        actions: z.array(link.extend({ variant: z.enum(['primary', 'secondary', 'tertiary']).default('primary') })).default([]),
      })
      .optional(),
    quickstarts: z
      .array(
        z.object({
          language,
          title: z.string(),
          command: z.string(),
          href: z.string(),
        }),
      )
      .default([]),
  }),
});

const examples = defineCollection({
  loader: glob({ base: './src/content/examples', pattern: '**/[^_]*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      category: z.enum(exampleCategoryIds),
      group: z.string(),
      order: z.number().default(100),
      image: image().optional(),
      sources: z
        .object({
          python: z.string(),
          rust: z.string(),
          java: z.string(),
          web: z.string(),
        })
        .partial()
        .refine((s) => Object.keys(s).length > 0, 'List at least one source file.'),
    }),
});

export const collections = { docs, examples };
