# Rebuild notes (October 2026)

The site was rebuilt from scratch on the `rebuild-2026` branch, redesigned in a second pass, then cut down and polished in a third pass (both below, newest first). The old React force-graph prototype is still in git history (last commit `964b56c`). Nothing has been pushed or deployed.

## Running it

```sh
npm install
npm run dev       # http://localhost:4321/website/
npm run build     # type-checks (astro check), then builds to dist/
npm run preview   # serves dist/ locally
npm run deploy    # builds, then publishes dist/ to the gh-pages branch (pushes to origin)
```

Node 20.3 or newer works. See the upgrade TODO below.

## Featured pass

"Start here" now holds exactly three cards, in this order: **Notion** (Core Product, workspace & collaboration), **Neopom**, and **Amazon Prime Gaming**. Nanosecond and SPIN went back into the index.

- **Data** is in `src/data/featured.ts`. Every line comes from the featured brief (Notion Career History, the résumé, Rappler, EnVi Media, and the TikTok). Neopom's entry in `projects.ts` stays, so the hero still counts 17 projects. The card's `project: "neopom"` keeps it out of the index, which is now numbered 04–19.
- **Cards** (`FeaturedCard.astro`) are full width now. Each one has a hook, highlights (past four, they fold into a "N more" disclosure), and, on wide screens, a ruled column of metrics beside the text. Neopom has a press strip with the Rappler and EnVi quotes and the TikTok (caption, likes/comments/saves). Prime Gaming has no metrics in any source, so it gets a "Still live" flag. Each card has its own hue (Notion tomato, Neopom green, Prime purple), and the crosshairs and glyph spin are unchanged.
- **The brief's flags, kept:** Home says "built", never "led". Neopom has no year. The TikTok comment is a paraphrase, with no quotation marks. The TikTok numbers come from your screenshot.
- **Not checked by eye.** I couldn't take screenshots in this session, so look at home at desktop and phone widths, in light and dark.

## Third pass: what changed

**Removed**

- **Notes.** The `/notes/` pages, the nav item, the `notes` content collection (`src/content.config.ts`, `src/content/`), `lib/notes.ts`, `NoteList.astro`, `prose.css`, and the Shiki/Markdown config. Nothing linked to notes is left in the build. The site was never deployed with notes, so no redirects are needed.
- **DSA tracker** is gone from `src/data/projects.ts`. There are 17 projects now.

**Routes** are now `/` (projects) and `/about/`, plus the 404 page.

**Design, and what it borrows.** I screenshotted every reference site (alanagoyal.com reading list, mayven.computer/about, yannglt.com, ryo.lu, tmb.sh, kenbui.net, beautifului.dev) and took their taste, not their content. They share restraint: one or two typefaces, small type, hairline rules, a single accent, and one or two crafted details instead of motion everywhere. The second-pass site was the opposite (dot grid, 17 tinted gradient cards, a ticker, tilting cards), so this pass mostly takes things away.

- **Ground.** The dotted graph paper is now a faint SVG-noise paper grain, like mayven's (`body::before` in `global.css`). Kind colors have lower chroma. The page is narrower (66rem), and radii are smaller.
- **Header** (yann, tmb). Name plus an italic "Software engineer". The nav is mono text, and the current page sits in tomato `[ brackets ]`. On other items the brackets slide in on hover. A hairline rule sits under the header.
- **Hero.** The springy Fraunces headline stays, since it's the site's own detail. The topic ticker is replaced by an identity panel (yann's Identity/Role block, mayven's key–value table): Role, Previously, Projects (count and year span, computed from the data), and More (About · GitHub). Every value comes from `site.ts` or `projects.ts`.
- **"Start here."** Nanosecond and SPIN are plain raised cards with printer's registration crosshairs on each corner (yann's crop marks). On hover the crosshairs turn 45° and take the kind color, and the glyph spins (`FeaturedCard.astro`).
- **"Everything else."** The other 15 projects are a numbered index (beautifului's "01 Title description" rows) with dashed hairlines: number, glyph, title, summary, topics / stack, kind, year, links. Numbering continues from the featured cards (03–17). On hover a row picks up a faint wash of its kind color and its glyph turns a quarter turn (`ProjectRow.astro`). On phones the number hides and kind, year, and links share one line.
- **Filters** are a segmented control (beautifului's "Drive / Dots / Orbit"): one track, with the pressed segment raised. They still mirror `?kind=` and stay hidden without JS. They apply to the index only.
- **About.** Prose on the left, and a column on the right, set off by a hairline, holding the career list and contact links. On narrow screens it stacks.
- **Footer.** Smaller, with a hairline rule above it.
- Removed `Ticker.astro`. `ProjectCard.astro` became `FeaturedCard.astro`.

No copy was added except section labels ("Start here", "Everything else", "Previously", "More") and the filter blurb "Filter by what you'd do with each one." No new facts.

**Checked by eye.** Playwright screenshots of home at 1440px (light and dark) and 390px, `?kind=read`, About, and 404. They turned up two problems, both fixed. On phones the year collided with the Visit link, because both shared one grid cell. In dark mode there was a seam where the grain stopped at the first viewport, because it was `position: fixed`; it's `absolute` on the full-height body now. Hover states (brackets, crosshairs, glyph turns) can't be checked in a still screenshot, so try them in a browser.

To repeat the screenshots: `npx playwright@1.64.1 screenshot --full-page --viewport-size=1440,900 http://localhost:4321/website/ out.png` while `npm run preview` (or dev) runs. Chromium for Playwright is now installed in `~/Library/Caches/ms-playwright`. `.scratch/` is gitignored for this kind of output.

## Second pass: what changed

Its content fixes and project selection still hold. Its visual design was mostly replaced by the third pass above, so read the "Visual design" part as history. The type, kind hues, glyphs, springy headline, and filters carried over.

**Content fixes**

- Removed the paragraph about being born in the Philippines, moving at eight, being first in the family to finish college, financial math, working jobs, and commuting. Nothing biographical replaced it.
- Notion role is now "Software engineer, Core Product" everywhere it appears (About copy and the career list). The old "infrastructure and growth" wording is gone from the code.

**Information architecture.** The site is built around the projects now:

| Route | What's there |
| --- | --- |
| `/` | One-line intro, a ticker of topics pulled from the project data, then the filterable project index |
| `/about/` | Three short paragraphs, the career list, and contact links |
| `/notes/` and `/notes/<slug>/` | Writing (was a section on the home page) |

The old single long page (hero, about, projects, writing, contact) is gone.

**Visual design.** The goal was a site with its own personality, not a generic template:

- **Type.** Fraunces (variable) does display and body, and the design uses its softness and "wonk" axes, not just weight. JetBrains Mono is for labels and metadata. Both are self-hosted through Fontsource.
- **Color.** Cream paper on a dotted graph-paper background, blue-black ink, and a tomato accent. Each project kind gets one OKLCH hue (`.kind-*` in `global.css`), and its ink and wash colors are derived per theme. Adding a kind means picking one number. Dark mode is a deep night blue.
- **Project cards** are numbered like specimens ("No. 01 · 2026"). Each has a small generative glyph seeded by its slug, so it stays the same on every build, with a shape family per kind: orbits for explainers, rings of pips for games, arches for reading sites, checked grids for tools, nested squares for rebuilds, spirals for early work (`src/lib/glyph.ts`). The first two cards are wide, and the grid packs smaller cards into the gaps beside them.
- **Motion.** The hero letters drop in one after another, and under the pointer each letter goes bold and wonky. Cards rise in on load and lean a little when hovered (each card's lean comes from its seed), and the glyph slowly spins. The topic ticker pauses on hover. Filtering animates through the View Transitions API, and pages cross-fade in browsers that support it. With reduced motion on, all of it is off and the ticker becomes a wrapped list.
- **Filters** (Play / Poke at / Read / Use / Rebuild / Early) show a one-line description of each kind and are mirrored in `?kind=`, so a filtered view can be linked. Without JS, every project shows and the filters stay hidden.

JS shipped: the theme toggle and the filter script, both small and inlined by Astro. Everything else is CSS.

**Checked by eye this time.** I took Playwright screenshots of the home page at 1440px and 390px, in light and dark mode, with the `?kind=` filter applied, plus the About page. That turned up a gap beside the first wide card (fixed with dense grid packing), filter dots in the wrong color, and arches that looked nearly the same on every card. All three are fixed. Hover states and the animations themselves can't be checked in a still screenshot, so try them in a browser.

**Skills.** The pstack skills aren't installed in this environment, so I applied their principles by hand: typed data modules, no unused abstractions, and plain, minimal copy.

## Projects: what's included and why

Sources: `gh repo list stannrodriguez`, `gh repo view` READMEs, the local clones in `~/Projects`, raw source files for repos with boilerplate READMEs, and a check that every live URL loads. Each description only says what the README, code, or live site shows. I didn't invent features, numbers, or outcomes. Repos with boilerplate READMEs (sound_viz, optical_illusions) are described from their `App` source files.

The kinds are there to show range, from games to explainers to reading sites to tools:

| # | Project | Repo | Kind | Live |
| --- | --- | --- | --- | --- |
| 1 | Nanosecond | nanosecond | Play | nanosecond-henna.vercel.app |
| 2 | SPIN | ping-pong-master | Poke at | GitHub Pages |
| 3 | Twenty things we figured out about the mind | aplysium | Poke at | GitHub Pages |
| 4 | Nightfall | nightfall | Read | GitHub Pages |
| 5 | Radix | verbena | Play | GitHub Pages |
| 6 | Emotion Atlas | emotions | Use | GitHub Pages |
| 7 | Throughline | throughline | Read | GitHub Pages |
| 8 | Metaphors Worth Living By | metaphors | Read | GitHub Pages |
| 9 | Laws & Adages | eponyms | Read | GitHub Pages |
| 10 | Reach | daily-reach | Use | GitHub Pages |
| 11 | Sound Physics Visualizer | sound_viz | Poke at | (code only) |
| 12 | Optical Illusion Breaker | optical_illusions | Poke at | (code only) |
| 13 | A web browser | browser_eng | Rebuild | (code only) |
| 14 | A neural network in R | simple-ann | Rebuild | (code only) |
| 15 | Neopom | (none public) | Early | neopom.net |
| 16 | LoanApp | LoanApp | Early | (code only) |
| 17 | PotatoDetector | PotatoDetector | Early | (code only) |

Projects with a live site come first, since that's what a visitor can actually try. Nanosecond and SPIN get the featured cards because they're the deepest work. Nanosecond's card says it's pre-alpha and built mostly with Claude Code, because its README says both.

**Left out, and why**

- **Forks:** ryos, workflow-agents-workshop-ts, mini-component-library, character-creator, code_snippets.
- **Interview and company exercises:** workflow-engine-exercise, ai-native-interview-boilerplate, interview_prep, interview-practice, elicit-frontend-interview, elicit-node-smoke-test, justin_refactor_exercise, react_table_feature_add, and ChatExampleApp (a test app for the Assembled SDK).
- **Private repos:** sims, decision-gym, interview-trainer, tracker, pomodorozen, http_in_a_weekend, frontend_challenges, css_for_js, cocktail-maker, BetterSelf, React-Scheduler, ncity_mag, CriminalRecordsUS.
- **Local-only, not on GitHub:** recurse, numeric, orbata-expo, MFG, tutorial, css-grid, pomodorozen-rn, notion. There's nothing public to link.
- **Tutorials and course follow-alongs:** microblog (Flask Mega-Tutorial), redux-todomvc, typescript-tutorial, DockerMastery, DeepLearningTutorial, Python-Masterclass, CTC-Solutions, fullstack-boilerplate, ReactSandbox.
- **Too thin to describe honestly:** three_js and opengl (README only), undistracted (one route to a landing page), ChatApp (CRA boilerplate README), SecondNature and CountryScorecard (one-line descriptions only), cv.
- **evergreen** (an earlier personal-site concept). Its Pages URL returns 404, and it would compete with this site.
- **dsa-tracker.** Stephanie asked for it to be removed in the third pass.

## TODOs for Stephanie

Highest value first.

1. **Read the project copy** (`src/data/projects.ts`). Every line is factual, but none of it is in your voice yet. Reorder, cut, or add anything. The `status` field on Nanosecond is optional.
2. **Neopom.** Done: copy, stack (React, Firebase), and link (neopom.net) now come from the résumé. No year, on purpose.
3. **Live links I couldn't confirm.** `stannrodriguez.github.io/sound_viz/` responds, but its page title is "Vite + React", and I couldn't tell whether the app actually renders, so the card links only the code. If it works, add `live: pages("sound_viz")`. Nanosecond is client-rendered, so the fetch saw only its title. It loads, but give it a quick look.
4. **Contact** (`src/data/site.ts`). Done: email, LinkedIn, and the résumé (`public/resume.pdf`). The phone number is deliberately left off.
5. **About copy** (`src/pages/about.astro`). It's short on purpose. The career list and the first paragraph follow the résumé (`public/resume.pdf`). The last line ("serve a good purpose… come away better for it") is adapted from your old site. Check that it still sounds like you. Add years if you want them.
6. **Try the hover details** in a real browser: the nav brackets, the crosshairs on the featured cards, and the glyphs turning in the index rows. If any of them feels like too much, each one is a few lines of CSS in its own component.
7. **Upgrade Node and Astro.** Install Node 22+, then `npm install astro@latest @astrojs/check@latest`. `npm audit` flags XSS advisories in Astro below 7.3.2. They're low risk for a static site with only your own content, but the upgrade clears them.
8. **Social preview image.** Add a 1200×630 image to `public/` and an `og:image` tag in `src/layouts/BaseLayout.astro`. A grid of the project glyphs would make a good one.
9. **Custom domain** (optional). Set `site` in `astro.config.mjs`, change `base` to `"/"`, and add `public/CNAME`.
10. **Deploy when ready.** Merge `rebuild-2026` into `main`, then run `npm run deploy`. That pushes to the `gh-pages` branch, so do it only once the TODO badges are gone.

## Earlier decisions that still hold

- **Astro 5 + TypeScript, static output.** Zero framework JS by default. TypeScript uses the `strictest` preset, and `npm run build` runs `astro check` first. Astro 5.18 is the newest release that runs on Node 20.
- **Same GitHub Pages deploy.** `base: "/website"`, internal links go through `withBase()` in `src/lib/url.ts`, `public/.nojekyll` keeps the `_astro/` directory from being dropped, and `gh-pages --dotfiles` publishes it.
- **Visible TODOs.** Any project or contact link with a `todo` field renders a dashed amber TODO badge.
- **Dark mode.** Follows the system setting with JS off. The toggle saves an explicit choice, and an inline script applies it before first paint.
- **Accessibility.** Skip link, landmarks, one `h1` per page, visible focus rings, `aria-pressed` on the toggle and filters, `aria-current` in the nav, and a polite live region for the filter description. The springy headline is hidden from screen readers, which get the plain text. Each featured card and index row is fully clickable through its title link, and Visit/Code stay separately focusable.
