import { getCollection, type CollectionEntry } from "astro:content";

export type Note = CollectionEntry<"notes">;

/** Published notes, newest first. Drafts only show up in dev. */
export async function getNotes(): Promise<Note[]> {
  const notes = await getCollection("notes", ({ data }) => import.meta.env.DEV || !data.draft);
  return notes.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}
