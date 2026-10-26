/**
 * Everything on the home page. Order here is display order.
 *
 * Each description only says what the project's README, code, or live site
 * shows. If you add one, keep to that rule. Entries with `todo` render a
 * visible TODO badge until the gap is filled.
 */

export interface Project {
  /** Stable id. */
  slug: string;
  title: string;
  /** One line. What it is, in plain words. */
  summary: string;
  /** What it's about. Not shown on the site. */
  topics: string[];
  stack: string[];
  year: number | undefined;
  live?: string;
  code?: string;
  /** Short status note, e.g. "pre-alpha". */
  status?: string;
  todo?: string;
}

const gh = (repo: string) => `https://github.com/stannrodriguez/${repo}`;
const pages = (repo: string) => `https://stannrodriguez.github.io/${repo}/`;

export const projects: Project[] = [
  {
    slug: "nanosecond",
    title: "Nanosecond",
    summary: "A game for building systems design intuition, starting from physics.",
    topics: ["systems design", "latency", "queueing"],
    stack: ["React", "TypeScript", "Zustand", "Playwright"],
    year: 2026,
    live: "https://nanosecond-henna.vercel.app",
    code: gh("nanosecond"),
    status: "pre-alpha, built mostly with Claude Code",
  },
  {
    slug: "spin",
    title: "SPIN",
    summary: "An interactive explainer of why a spinning ping pong ball curves.",
    topics: ["physics", "table tennis"],
    stack: ["React", "TypeScript", "Tailwind", "Vitest"],
    year: 2026,
    live: pages("ping-pong-master"),
    code: gh("ping-pong-master"),
  },
  {
    slug: "aplysium",
    title: "Twenty things we figured out about the mind",
    summary: "Twenty neuroscience findings that survived replication. Thirteen come with an experiment you can try.",
    topics: ["neuroscience", "psychology"],
    stack: ["Astro", "TypeScript", "custom elements"],
    year: 2026,
    live: pages("aplysium"),
    code: gh("aplysium"),
  },
  {
    slug: "nightfall",
    title: "Nightfall",
    summary: "Myths and fables from around the world, each told over three nights.",
    topics: ["mythology", "storytelling"],
    stack: ["Astro"],
    year: 2026,
    live: pages("nightfall"),
    code: gh("nightfall"),
  },
  {
    slug: "radix",
    title: "Radix",
    summary: "A herbarium of Latin roots. Take words apart and build new ones.",
    topics: ["etymology", "spaced repetition"],
    stack: ["HTML", "CSS", "JavaScript"],
    year: 2026,
    live: pages("verbena"),
    code: gh("verbena"),
  },
  {
    slug: "emotion-atlas",
    title: "Emotion Atlas",
    summary: "An emotion wheel. Six families bloom into 63 finer feelings.",
    topics: ["emotions", "language"],
    stack: ["JavaScript", "SVG", "Playwright"],
    year: 2026,
    live: pages("emotions"),
    code: gh("emotions"),
  },
  {
    slug: "throughline",
    title: "Throughline",
    summary: "The history of invention along three roads: energy, materials, and information.",
    topics: ["history", "technology"],
    stack: ["Astro", "MDX"],
    year: 2026,
    live: pages("throughline"),
    code: gh("throughline"),
  },
  {
    slug: "metaphors",
    title: "Metaphors Worth Living By",
    summary: "Twenty metaphors, how each one works, and where it breaks.",
    topics: ["ideas", "language"],
    stack: ["Astro"],
    year: 2026,
    live: pages("metaphors"),
    code: gh("metaphors"),
  },
  {
    slug: "laws-and-adages",
    title: "Laws & Adages",
    summary: "Twenty eponymous laws, like Goodhart's, on flip cards.",
    topics: ["ideas", "mental models"],
    stack: ["Node", "zero dependencies"],
    year: 2026,
    live: pages("eponyms"),
    code: gh("eponyms"),
  },
  {
    slug: "reach",
    title: "Reach",
    summary: "Mobility and strength routines in 3, 5, 15, or 28 minutes.",
    topics: ["mobility", "fitness"],
    stack: ["HTML", "JavaScript"],
    year: 2026,
    live: pages("daily-reach"),
    code: gh("daily-reach"),
  },
  {
    slug: "sound-physics",
    title: "Sound Physics Visualizer",
    summary: "Six ways to see sound, from sine waves to the Fourier transform.",
    topics: ["sound", "signal processing"],
    stack: ["React", "Vite"],
    year: 2024,
    code: gh("sound_viz"),
  },
  {
    slug: "optical-illusions",
    title: "Optical Illusion Breaker",
    summary: "Gray spheres that look colored behind stripes. Toggle the stripes to check.",
    topics: ["perception", "color"],
    stack: ["React", "TypeScript"],
    year: 2024,
    code: gh("optical_illusions"),
  },
  {
    slug: "browser",
    title: "A web browser",
    summary: "A browser built from scratch, following browser.engineering.",
    topics: ["browsers", "the web"],
    stack: ["Python"],
    year: 2024,
    code: gh("browser_eng"),
  },
  {
    slug: "simple-ann",
    title: "A neural network in R",
    summary: "A simple neural network built from scratch in R.",
    topics: ["machine learning"],
    stack: ["R"],
    year: 2018,
    code: gh("simple-ann"),
  },
  {
    slug: "neopom",
    title: "Neopom",
    summary:
      "A motivational productivity app with 200,000 users across 32 countries. I built it end to end: development, UX/UI, marketing, and analytics.",
    topics: ["productivity"],
    stack: ["React", "Firebase"],
    year: undefined,
    live: "https://neopom.net",
  },
  {
    slug: "loan-app",
    title: "LoanApp",
    summary: "A Flask app that plans how to pay off personal debt.",
    topics: ["personal finance"],
    stack: ["Python", "Flask"],
    year: 2020,
    code: gh("LoanApp"),
  },
  {
    slug: "potato-detector",
    title: "PotatoDetector",
    summary: "A machine learning app that insists my face is a potato.",
    topics: ["machine learning", "jokes"],
    stack: ["Python", "Jupyter"],
    year: 2020,
    code: gh("PotatoDetector"),
  },
];
