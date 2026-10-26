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
  title: "Stephanie Rodriguez, software engineer",
  description:
    "Self-taught software engineer. Previously Notion and Amazon. Looking for senior forward-deployed, applied AI, and product engineering roles.",
  lang: "en",
} as const;

export const nav = [
  { label: "About", hash: "about" },
  { label: "Projects", hash: "projects" },
  { label: "Writing", hash: "writing" },
  { label: "Contact", hash: "contact" },
] as const;

export const contact: ContactLink[] = [
  {
    label: "Email",
    todo: "Add the address you want public (a dedicated one is fine).",
  },
  {
    label: "GitHub",
    href: "https://github.com/stannrodriguez",
    handle: "stannrodriguez",
    todo: "Inferred from the old GitHub Pages URL. Confirm this is the profile you want linked.",
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
