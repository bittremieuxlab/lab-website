import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const personRoles = z.enum([
  'PhD Student',
  'Software Engineer',
  'MSc Student',
  'Postdoc',
  'Professor',
  'PI',
]);
const personStatuses = z.enum(['active', 'alumni', 'collaborator']);
const personTeams = z.enum(['Mass Spectrometry', 'Metabolomics']);

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    email: z.email(),
    role: personRoles,
    status: personStatuses,
    team: z.array(personTeams).default([]),
    tags: z.array(z.string()).default([]),
    photo: z.string().optional(),
    bio_short: z.string().optional(),
    pronouns: z.string().optional(),
    affiliation: z.string().optional(), // institution name for external collaborators
    links: z
      .object({
        website: z.url().optional(),
        github: z.url().optional(),
        scholar: z.url().optional(),
        orcid: z.string().optional(),
        linkedin: z.url().optional(),
      })
      .optional(),
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

const positions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/positions' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['phd', 'postdoc', 'internship', 'other']),
    status: z.enum(['open', 'closed']).default('open'),
    duration: z.string().optional(), // e.g. "4 years"
    location: z.string().optional(), // e.g. "University of Antwerp, Belgium"
  }),
});

const theses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/theses' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['bachelor', 'master', 'bachelor/master', 'phd']),
    topics: z.array(z.string()).default([]),
    status: z.enum(['available', 'ongoing', 'completed']).default('available'),
    student: z.string().optional(), // for ongoing/completed
    year: z.number().optional(), // for completed
  }),
});

export const collections = { people, research, news, theses, positions };
