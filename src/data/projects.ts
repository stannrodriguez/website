/**
 * Everything on the home page. Order here is display order.
 *
 * Each description only says what the project's README, code, or live site
 * shows. If you add one, keep to that rule. Entries with `todo` render a
 * visible TODO badge until the gap is filled.
 */

export const kinds = {
  play: { label: "Play", blurb: "Games and trainers" },
  poke: { label: "Poke at", blurb: "Interactive explainers and simulations" },
  read: { label: "Read", blurb: "Collections and reading sites" },
  use: { label: "Use", blurb: "Small tools I use myself" },
  rebuild: { label: "Rebuild", blurb: "Things rebuilt from scratch to learn how they work" },
  early: { label: "Early", blurb: "From when I was first learning to code" },
} as const;

export type Kind = keyof typeof kinds;

export interface Project {
  /** Stable id; also seeds the project's glyph. */
  slug: string;
  title: string;
  /** One line. What it is, in plain words. */
  summary: string;
  kind: Kind;
  /** What it's about. Shown as small tags. */
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
    summary:
      "A game for building systems design intuition from the physics up: race a photon, saturate a queue, survive an on-call run.",
    kind: "play",
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
    summary:
      "An interactive explainer for why a spinning ping pong ball does what it does, driven by one tested physics engine in real units.",
    kind: "poke",
    topics: ["physics", "table tennis"],
    stack: ["React", "TypeScript", "Tailwind", "Vitest"],
    year: 2026,
    live: pages("ping-pong-master"),
    code: gh("ping-pong-master"),
  },
  {
    slug: "aplysium",
    title: "Twenty things we figured out about the mind",
    summary:
      "Twenty landmark neuroscience studies that held up under replication. Thirteen come with a small experiment you can run on the page.",
    kind: "poke",
    topics: ["neuroscience", "psychology"],
    stack: ["Astro", "TypeScript", "custom elements"],
    year: 2026,
    live: pages("aplysium"),
    code: gh("aplysium"),
  },
  {
    slug: "nightfall",
    title: "Nightfall",
    summary:
      "A world tour of myth and fable. Each myth is a door in a hall, or a star in its culture's constellation, retold over three nights.",
    kind: "read",
    topics: ["mythology", "storytelling"],
    stack: ["Astro"],
    year: 2026,
    live: pages("nightfall"),
    code: gh("nightfall"),
  },
  {
    slug: "radix",
    title: "Radix",
    summary:
      "A herbarium of Latin roots. Break words into their roots, compose new ones, and grow a garden of the roots you know.",
    kind: "play",
    topics: ["etymology", "spaced repetition"],
    stack: ["HTML", "CSS", "JavaScript"],
    year: 2026,
    live: pages("verbena"),
    code: gh("verbena"),
  },
  {
    slug: "emotion-atlas",
    title: "Emotion Atlas",
    summary: "An on-device emotion wheel. Six families bloom into 63 finer words, and each word opens its own page.",
    kind: "use",
    topics: ["emotions", "language"],
    stack: ["JavaScript", "SVG", "Playwright"],
    year: 2026,
    live: pages("emotions"),
    code: gh("emotions"),
  },
  {
    slug: "throughline",
    title: "Throughline",
    summary:
      "A reading site that traces the history of invention along three roads: energy, materials, and information.",
    kind: "read",
    topics: ["history", "technology"],
    stack: ["Astro", "MDX"],
    year: 2026,
    live: pages("throughline"),
    code: gh("throughline"),
  },
  {
    slug: "metaphors",
    title: "Metaphors Worth Living By",
    summary: "Twenty metaphors, each with its moment, its mechanics, and the point where it breaks. Draw one at random.",
    kind: "read",
    topics: ["ideas", "language"],
    stack: ["Astro"],
    year: 2026,
    live: pages("metaphors"),
    code: gh("metaphors"),
  },
  {
    slug: "laws-and-adages",
    title: "Laws & Adages",
    summary:
      "Twenty eponymous laws, like Goodhart's, on flip cards. Each has an origin, a mechanism, and where it breaks.",
    kind: "read",
    topics: ["ideas", "mental models"],
    stack: ["Node", "zero dependencies"],
    year: 2026,
    live: pages("eponyms"),
    code: gh("eponyms"),
  },
  {
    slug: "reach",
    title: "Reach",
    summary:
      "A time-first mobility and strength library. Pick 3, 5, 15, or 28 minutes and a timed routine walks you through it.",
    kind: "use",
    topics: ["mobility", "fitness"],
    stack: ["HTML", "JavaScript"],
    year: 2026,
    live: pages("daily-reach"),
    code: gh("daily-reach"),
  },
  {
    slug: "sound-physics",
    title: "Sound Physics Visualizer",
    summary: "Six views on how sound works, from sine waves and harmonics to the Fourier transform.",
    kind: "poke",
    topics: ["sound", "signal processing"],
    stack: ["React", "Vite"],
    year: 2024,
    code: gh("sound_viz"),
  },
  {
    slug: "optical-illusions",
    title: "Optical Illusion Breaker",
    summary: "Gray spheres that look colored behind red, green, and blue stripes. Toggle the stripes to see their true color.",
    kind: "poke",
    topics: ["perception", "color"],
    stack: ["React", "TypeScript"],
    year: 2024,
    code: gh("optical_illusions"),
  },
  {
    slug: "browser",
    title: "A web browser",
    summary: "My code for browser.engineering: a web browser built from scratch, from networking to layout.",
    kind: "rebuild",
    topics: ["browsers", "the web"],
    stack: ["Python"],
    year: 2024,
    code: gh("browser_eng"),
  },
  {
    slug: "simple-ann",
    title: "A neural network in R",
    summary: "A simple neural network implemented from scratch in R.",
    kind: "rebuild",
    topics: ["machine learning"],
    stack: ["R"],
    year: 2018,
    code: gh("simple-ann"),
  },
  {
    slug: "neopom",
    title: "Neopom",
    summary: "A productivity app I built in four days, about a year after I learned to code. It grew past 200,000 users.",
    kind: "early",
    topics: ["productivity"],
    stack: [],
    year: undefined,
    todo: "Add the year, the stack, and a link if there's a public one.",
  },
  {
    slug: "loan-app",
    title: "LoanApp",
    summary: "A Flask app that builds detailed strategies for paying off personal debts.",
    kind: "early",
    topics: ["personal finance"],
    stack: ["Python", "Flask"],
    year: 2020,
    code: gh("LoanApp"),
  },
  {
    slug: "potato-detector",
    title: "PotatoDetector",
    summary: "A machine learning app that jokingly identifies my face as a potato.",
    kind: "early",
    topics: ["machine learning", "jokes"],
    stack: ["Python", "Jupyter"],
    year: 2020,
    code: gh("PotatoDetector"),
  },
];
