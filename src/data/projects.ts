/**
 * Projects shown on the home page, in display order.
 *
 * Every entry is still a draft. Entries with `todo` render a visible TODO
 * badge plus the note, so nothing unfinished can go live unnoticed.
 * Once an entry is real, delete its `todo` field.
 */

export interface Project {
  title: string;
  /** One or two sentences: what it is, who it helped, what was hard. */
  summary: string;
  /** Short tags such as the stack or the domain. */
  tags: string[];
  year?: string;
  links?: { label: string; href: string }[];
  todo?: string;
}

export const projects: Project[] = [
  {
    title: "Applied AI project (placeholder)",
    summary:
      "Placeholder. Your strongest recent AI work goes here: the problem, who had it, what you shipped, and a number that shows it worked (accuracy, hours saved, adoption).",
    tags: ["LLMs", "evals"],
    todo: "Replace with a real project. This one should lead.",
  },
  {
    title: "Customer-facing build (placeholder)",
    summary:
      "Placeholder. A project where you worked directly with a user or customer to scope and ship something. This is the forward-deployed story.",
    tags: ["product engineering"],
    todo: "Replace with a real project, or delete this entry.",
  },
  {
    title: "Neopom",
    summary:
      "A productivity app I built in four days, about a year after I learned to code. It grew past 200,000 users. One of them told me it helped her get through college, and that's still the thing I'm proudest of.",
    tags: ["productivity", "solo build"],
    todo: "Drafted from the old site. Confirm the numbers, add a year and a link.",
  },
  {
    title: "A web browser from scratch",
    summary:
      "I wanted to understand how the web actually works, so I built a browser: networking, HTML parsing, layout, and rendering.",
    tags: ["systems", "learning project"],
    todo: "Drafted from the old site. Add the language, a repo link, and one thing that surprised you.",
  },
];
