import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons' }),
  schema: z.object({
    unit: z.number(),
    lesson: z.number(),
    title: z.string(),
    // Syllabus codes, e.g. "1.2 C1" (C = Core, S = Supplement)
    syllabus: z.array(z.string()),
    goals: z.array(z.string()),
    keyWords: z.array(z.string()),
    minutes: z.number().default(60),
  }),
});

export const collections = { lessons };
