/**
 * The featured work at the top of the home page. Order here is display order.
 *
 * Each entry is deliberately short: name, role, one plain sentence on what
 * Stephanie worked on, and links. Every line comes from ~/.featured_brief.md
 * (Notion Career History, the résumé, and the press pieces linked below); add
 * nothing that isn't there. Neopom has no year.
 */

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
  /** A project in projects.ts this entry stands for; it's left out of the project list below. */
  project?: string;
}

export const featured: Featured[] = [
  {
    slug: "assembled-ai-agents",
    org: "Assembled",
    role: "Software Engineer, AI Agents · San Francisco",
    title: "AI Agents",
    hook: "Built the chat agent for AI customer support.",
    links: [{ label: "assembled.com", href: "https://www.assembled.com" }],
  },
  {
    slug: "notion-core-product",
    org: "Notion",
    role: "Software Engineer, Core Product",
    title: "Notion",
    hook: "Worked on the sidebar, sharing, permissions, notifications, and Home.",
    links: [
      { label: "Sidebar", href: "https://www.notion.com/help/navigate-with-the-sidebar" },
      { label: "Teamspaces", href: "https://www.notion.com/help/guides/teamspaces-give-teams-home-for-important-work" },
      { label: "Business plan", href: "https://www.notion.com/blog/notion-introduces-business-plan-and-expanded-free-plan" },
      { label: "Notifications", href: "https://www.notion.com/releases/2023-02-09#better-notifications" },
    ],
  },
  {
    slug: "neopom",
    org: "Side project",
    role: "Solo: dev, design, marketing",
    title: "Neopom",
    hook: "A K-pop Pomodoro app that turns studying into collecting photocards.",
    links: [
      { label: "neopom.net", href: "https://neopom.net" },
      { label: "Rappler", href: "https://www.rappler.com/technology/features/websites-apps-boost-students-productivity/" },
      { label: "EnVi Media", href: "https://envimedia.co/three-studying-resources-to-help-k-pop-fans-pass-that-class/" },
      { label: "TikTok", href: "https://www.tiktok.com/@meganomnom_/video/7008039251807915290" },
    ],
    project: "neopom",
  },
  {
    slug: "prime-gaming",
    org: "Amazon",
    role: "Software Development Engineer",
    title: "Prime Gaming",
    hook: "Led the frontend redesign. It's still live.",
    links: [{ label: "Claims page", href: "https://luna.amazon.com/claims/home?g=s" }],
  },
];
