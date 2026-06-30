/**
 * Content collection schemas for stories and lab.
 *
 * Uses the Content Layer `glob` loader (Astro 6+). The default id
 * generation strips the file extension and a trailing `/index`, so
 * `stories/foo.md` and `stories/foo/index.md` both yield the id `foo` —
 * matching the URLs the legacy collection produced.
 */

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const stories = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/stories" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
  }),
});

const lab = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/lab" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    description: z.string(),
    date: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { stories, lab };
