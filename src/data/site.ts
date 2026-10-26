/**
 * Site-wide facts. Anything with `todo` set renders a visible TODO badge
 * until Stephanie fills it in. See REBUILD_NOTES.md.
 */

export interface ContactLink {
  label: string;
  /** Omit until the real URL is known; the link renders as plain text. */
  href?: string;
  handle?: string;
  todo?: string;
}

export const site = {
  name: "Stephanie Rodriguez",
  title: "Stephanie Rodriguez",
  description:
    "Software engineer, previously at Notion and Amazon. Small websites and tools about systems, physics, the mind, myth, and language.",
  lang: "en",
} as const;

/** Paths are relative to the site base. */
export const nav = [
  { label: "Projects", path: "" },
  { label: "Notes", path: "notes/" },
  { label: "About", path: "about/" },
] as const;

export const contact: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/stannrodriguez",
    handle: "stannrodriguez",
  },
  {
    label: "Email",
    todo: "Add the address you want public (a dedicated one is fine).",
  },
  {
    label: "LinkedIn",
    todo: "Add your LinkedIn URL.",
  },
  {
    label: "Résumé",
    todo: "Drop a PDF in public/ and link it here.",
  },
];

export interface Role {
  org: string;
  role: string;
}

/** Most recent first. Dates intentionally omitted until confirmed. */
export const career: Role[] = [
  { org: "Notion", role: "Software engineer, Core Product" },
  { org: "Amazon", role: "Software engineer, Prime Gaming" },
  { org: "Capital Group", role: "Quantitative analyst" },
  { org: "Kaiser Permanente", role: "Actuary" },
];
