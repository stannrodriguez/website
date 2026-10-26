/**
 * Site-wide facts. Anything with `todo` set renders a visible TODO badge
 * until Stephanie fills it in. See REBUILD_NOTES.md.
 */

import { withBase } from "../lib/url";

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
    "Software engineer, most recently building AI agents at Assembled. Small websites and tools about systems, physics, the mind, myth, and language.",
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
}

/** Most recent first. Dates intentionally omitted until confirmed. */
export const career: Role[] = [
  { org: "Assembled", role: "Software Engineer, AI Agents" },
  { org: "Recurse Center", role: "Participant" },
  { org: "Notion", role: "Software Engineer, Core Product" },
  { org: "Amazon", role: "Software Development Engineer, Prime Gaming" },
  { org: "Sonder Social", role: "Full Stack Software Engineer" },
  { org: "Capital Group", role: "Risk and Quantitative Analyst" },
];
