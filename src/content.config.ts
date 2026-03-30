import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    status: z.enum(['active', 'alumni']).default('active'),
    pronouns: z.string().optional(),
    bio_short: z.string().optional(),
    email: z.string().email().optional(),
    photo: z.string().optional(),
    links: z
      .object({
        github: z.string().url().optional(),
        scholar: z.string().url().optional(),
        orcid: z.string().optional(),
        linkedin: z.string().url().optional(),
        twitter: z.string().url().optional(),
        website: z.string().url().optional(),
      })
      .optional(),
    team: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    projects: z.array(z.string()).optional(),
    selected_publications: z.array(z.string()).optional(),
    awards: z.array(z.string()).optional(),
    education: z.array(z.string()).optional(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    url: z.string().optional(),
  }),
});

export const collections = { people, research, news };
