/**
 * The large cards at the top of the home page. Order here is display order.
 *
 * Each card is deliberately short: name, role, one plain sentence on what
 * Stephanie worked on, and links. Every line comes from ~/.featured_brief.md
 * (Notion Career History, the résumé, and the press pieces linked below); add
 * nothing that isn't there. Neopom has no year.
 */

import type { Kind } from "./projects";

export interface Link {
  label: string;
  href: string;
}

export interface Featured {
  slug: string;
  /** Where it happened, e.g. "Notion" or "Side project". */
  org: string;
  role: string;
  title: string;
  /** One short, plain sentence. */
  hook: string;
  links: Link[];
  /** Glyph family (shape only) and hue for the card's color. */
  glyph: Kind;
  hue: number;
  /** A project in projects.ts this card stands for; it's left out of the index below. */
  project?: string;
}

export const featured: Featured[] = [
  {
    slug: "assembled-ai-agents",
    org: "Assembled",
    role: "Software Engineer, AI Agents · San Francisco",
    title: "AI Agents",
    hook: "Built AI agents for customer support: chat, email, voice, and copilot.",
    links: [{ label: "assembled.com", href: "https://www.assembled.com" }],
    glyph: "poke",
    hue: 250,
  },
  {
    slug: "notion-core-product",
    org: "Notion",
    role: "Software Engineer, Core Product",
    title: "Workspace & collaboration",
    hook: "Core Product team, working on workspace and collaboration features like the sidebar, sharing, permissions, notifications, and Home.",
    links: [
      { label: "Sidebar help", href: "https://www.notion.com/help/navigate-with-the-sidebar" },
      { label: "Teamspaces guide", href: "https://www.notion.com/help/guides/teamspaces-give-teams-home-for-important-work" },
      { label: "Business plan launch", href: "https://www.notion.com/blog/notion-introduces-business-plan-and-expanded-free-plan" },
      { label: "Notifications release notes (Feb 2023)", href: "https://www.notion.com/releases/2023-02-09#better-notifications" },
    ],
    glyph: "use",
    hue: 33,
  },
  {
    slug: "neopom",
    org: "Side project",
    role: "Solo: dev, UX/UI, marketing, analytics",
    title: "Neopom",
    hook: "A K-pop (NCT) themed Pomodoro app that turns studying into collecting photocards.",
    links: [
      { label: "neopom.net", href: "https://neopom.net" },
      { label: "Rappler", href: "https://www.rappler.com/technology/features/websites-apps-boost-students-productivity/" },
      { label: "EnVi Media", href: "https://envimedia.co/three-studying-resources-to-help-k-pop-fans-pass-that-class/" },
      { label: "TikTok", href: "https://www.tiktok.com/@meganomnom_/video/7008039251807915290" },
    ],
    glyph: "early",
    hue: 150,
    project: "neopom",
  },
  {
    slug: "prime-gaming",
    org: "Amazon",
    role: "Software Development Engineer, Prime Gaming",
    title: "Prime Gaming",
    hook: "Led the frontend redesign of Prime Gaming, and it is still live today.",
    links: [{ label: "Live Prime Gaming claims page", href: "https://luna.amazon.com/claims/home?g=s" }],
    glyph: "play",
    hue: 300,
  },
];
