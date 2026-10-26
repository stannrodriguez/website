/**
 * The three large cards at the top of the home page. Order here is display
 * order.
 *
 * Every line comes from ~/.featured_brief.md (Notion Career History, the
 * résumé, and the press pieces linked below). Things the brief flags, kept on
 * purpose: Stephanie joined Notion Home partway through, so it says "built",
 * never "led"; Neopom has no year; the TikTok comment is paraphrased, never
 * quoted, because its exact wording isn't verified.
 */

import type { Kind } from "./projects";

export interface Metric {
  value: string;
  label: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface Press {
  source: string;
  /** Byline and/or headline, shown small under the quote. */
  credit: string;
  date?: string;
  quote: string;
  href: string;
}

export interface Social {
  source: string;
  handle: string;
  href: string;
  /** The post's own caption, which is safe to quote. */
  caption: string;
  stats: Metric[];
  /** Paraphrase only; never put it in quotation marks. */
  note?: string;
}

export interface Featured {
  slug: string;
  /** Where it happened, e.g. "Notion" or "Side project". */
  org: string;
  role: string;
  title: string;
  hook: string;
  bullets: string[];
  metrics: Metric[];
  /** Short status flag, e.g. "Still live". */
  flag?: string;
  stack?: string[];
  press?: Press[];
  social?: Social;
  links: Link[];
  /** Glyph family (shape only) and hue for the card's color. */
  glyph: Kind;
  hue: number;
  /** A project in projects.ts this card stands for; it's left out of the index below. */
  project?: string;
}

export const featured: Featured[] = [
  {
    slug: "notion-core-product",
    org: "Notion",
    role: "Software Engineer, Core Product",
    title: "Workspace & collaboration",
    hook: "Shipped the parts of Notion everyone touches outside the editor: sidebar, sharing, notifications, Home, and the workspace switcher.",
    bullets: [
      "My team owned the workspace and collaboration surfaces: sidebar, users and permissions, share menu, notifications, Home, and the workspace switcher.",
      "Built the Publish tab in 2 weeks, spec to QA: ~7% more page invites, ~4% more workspace invites, ~1.5% more multiplayer workspaces, and ~60% fewer accidental publishes.",
      "DRI for teamspace behavior on plan changes and plan-based feature gating for the Business/Plus launch. No bugs escalated to eng in 2 years.",
      "DRI end to end on the workspace switcher redesign: ~4% fewer member removals, ~2% more workspace invites.",
      "DRI on notification read/unread and filters; notification clicks initially doubled in the first month.",
      "Built Home features (Most Visited, Favorites, the Calendar tile), and led a 3-week quality sprint with 4 engineers: 11 stale gates removed, 13 class components converted, 15 backlog bugs fixed.",
    ],
    metrics: [
      { value: "3×", label: "YoY growth in multi-member workspaces after the Business/Plus launch" },
      { value: "~60%", label: "fewer accidental publishes with the Publish tab" },
      { value: "2 wks", label: "Publish tab, spec to QA" },
      { value: "0", label: "bugs escalated to eng in 2 years" },
    ],
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
    hook: "A K-pop (NCT) themed Pomodoro app that turned studying into collecting photocards, used by 200,000 people in 32 countries.",
    bullets: [
      "25-minute Pomodoro sessions with a task list.",
      "Every 8 sessions earns a random NCT member photocard for your collection.",
      "A Quotes tab with motivational quotes from the members.",
      "Built alone, end to end: development, UX/UI, marketing, and analytics.",
    ],
    metrics: [
      { value: "200,000", label: "users" },
      { value: "32", label: "countries" },
      { value: "~29.1K", label: "likes on one fan's TikTok" },
    ],
    stack: ["React", "Firebase"],
    press: [
      {
        source: "Rappler",
        credit: "Janssen Lu, “LIST: 11 websites, apps that help boost students’ productivity”",
        date: "Aug 1, 2021",
        quote:
          "Calling all NCTzens! Neopom is another website that uses the pomodoro technique, but tailored to fans of K-pop boy group NCT.",
        href: "https://www.rappler.com/technology/features/websites-apps-boost-students-productivity/",
      },
      {
        source: "EnVi Media",
        credit: "Sumaiya, “Three Studying Resources To Help K-pop Fans Pass Class”",
        date: "Oct 18, 2022",
        quote: "This is the perfect studying app for NCTZENs!",
        href: "https://envimedia.co/three-studying-resources-to-help-k-pop-fans-pass-that-class/",
      },
    ],
    social: {
      source: "TikTok",
      handle: "@meganomnom_",
      href: "https://www.tiktok.com/@meganomnom_/video/7008039251807915290",
      caption: "neopom supremacy",
      stats: [
        { value: "~29.1K", label: "likes" },
        { value: "272", label: "comments" },
        { value: "4,649", label: "saves" },
      ],
      note: "One commenter said it helped them focus and pass an important assessment.",
    },
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
    bullets: [
      "Led the technical redesign of gaming.amazon.com.",
      "Revamped the Prime Gaming homepage with an automated content carousel, removing a third-party CMS.",
      "The redesign is still live at luna.amazon.com/claims; Prime Gaming now lives under Luna.",
    ],
    metrics: [],
    flag: "Still live",
    links: [{ label: "Live Prime Gaming claims page", href: "https://luna.amazon.com/claims/home?g=s" }],
    glyph: "play",
    hue: 300,
  },
];
