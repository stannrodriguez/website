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
  role: "Software engineer",
  description:
    "Software engineer, most recently building AI agents at Assembled. I make small websites about systems, physics, the mind, myth, and language.",
  lang: "en",
} as const;

/** Paths are relative to the site base. */
export const nav = [
  { label: "Projects", path: "" },
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
    href: "mailto:stephsiriban@gmail.com",
    handle: "stephsiriban@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stephanie-ann-rodriguez",
    handle: "stephanie-ann-rodriguez",
  },
];

export interface Role {
  org: string;
  role: string;
  dates: string;
}

/** Most recent first. Dates from the résumé. */
export const career: Role[] = [
  { org: "Assembled", role: "Software Engineer, AI Agents", dates: "2025–2026" },
  { org: "Recurse Center", role: "Participant", dates: "2024" },
  { org: "Notion", role: "Software Engineer, Core Product", dates: "2022–2024" },
  { org: "Amazon", role: "Software Development Engineer, Prime Gaming", dates: "2021–2022" },
  { org: "Sonder Social", role: "Full Stack Software Engineer", dates: "2020–2021" },
  { org: "Capital Group", role: "Risk and Quantitative Analyst", dates: "2018–2020" },
];
