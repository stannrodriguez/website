import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Drafts are visible in `npm run dev` but excluded from production builds. */
    draft: z.boolean().default(false),
    /** Marks placeholder content; renders a TODO badge. */
    todo: z.boolean().default(false),
  }),
});

export const collections = { notes };
