# Rebuild notes (October 2026)

The site was rebuilt from scratch on the `rebuild-2026` branch, then redesigned in a second pass (below). The old React force-graph prototype is still in git history (last commit `964b56c`). Nothing has been pushed or deployed.

## Running it

```sh
npm install
npm run dev       # http://localhost:4321/website/
npm run build     # type-checks (astro check), then builds to dist/
npm run preview   # serves dist/ locally
npm run deploy    # builds, then publishes dist/ to the gh-pages branch (pushes to origin)
```

Node 20.3 or newer works. See the upgrade TODO below.

## Second pass: what changed

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
| 11 | DSA tracker | dsa-tracker | Use | dsa-tracker-sable-ten.vercel.app |
| 12 | Sound Physics Visualizer | sound_viz | Poke at | (code only) |
| 13 | Optical Illusion Breaker | optical_illusions | Poke at | (code only) |
| 14 | A web browser | browser_eng | Rebuild | (code only) |
| 15 | A neural network in R | simple-ann | Rebuild | (code only) |
| 16 | Neopom | (none public) | Early | (none) |
| 17 | LoanApp | LoanApp | Early | (code only) |
| 18 | PotatoDetector | PotatoDetector | Early | (code only) |

Projects with a live site come first, since that's what a visitor can actually try. Nanosecond and SPIN get the wide cards because they're the deepest work. Nanosecond's card says it's pre-alpha and built mostly with Claude Code, because its README says both.

**Left out, and why**

- **Forks:** ryos, workflow-agents-workshop-ts, mini-component-library, character-creator, code_snippets.
- **Interview and company exercises:** workflow-engine-exercise, ai-native-interview-boilerplate, interview_prep, interview-practice, elicit-frontend-interview, elicit-node-smoke-test, justin_refactor_exercise, react_table_feature_add, and ChatExampleApp (a test app for the Assembled SDK).
- **Private repos:** sims, decision-gym, interview-trainer, tracker, pomodorozen, http_in_a_weekend, frontend_challenges, css_for_js, cocktail-maker, BetterSelf, React-Scheduler, ncity_mag, CriminalRecordsUS.
- **Local-only, not on GitHub:** recurse, numeric, orbata-expo, MFG, tutorial, css-grid, pomodorozen-rn, notion. There's nothing public to link.
- **Tutorials and course follow-alongs:** microblog (Flask Mega-Tutorial), redux-todomvc, typescript-tutorial, DockerMastery, DeepLearningTutorial, Python-Masterclass, CTC-Solutions, fullstack-boilerplate, ReactSandbox.
- **Too thin to describe honestly:** three_js and opengl (README only), undistracted (one route to a landing page), ChatApp (CRA boilerplate README), SecondNature and CountryScorecard (one-line descriptions only), cv.
- **evergreen** (an earlier personal-site concept). Its Pages URL returns 404, and it would compete with this site.

## TODOs for Stephanie

Highest value first.

1. **Read the project copy** (`src/data/projects.ts`). Every line is factual, but none of it is in your voice yet. Reorder, cut, or add anything. The `status` field on Nanosecond is optional.
2. **Neopom.** It has a visible TODO badge. Add the year, the stack, and a public link if there is one. If one of the private `pomodorozen` repos is Neopom, say so. I didn't assume it.
3. **Live links I couldn't confirm.** `stannrodriguez.github.io/sound_viz/` responds, but its page title is "Vite + React", and I couldn't tell whether the app actually renders, so the card links only the code. If it works, add `live: pages("sound_viz")`. Nanosecond and the DSA tracker are client-rendered, so the fetch saw only their titles. They load, but give them a quick look.
4. **Contact** (`src/data/site.ts`). Add a public email, a LinkedIn URL, and a résumé PDF in `public/`. Until then, each one shows a TODO badge on the About page.
5. **About copy** (`src/pages/about.astro`). It's short on purpose. The last line ("serve a good purpose… come away better for it") is adapted from your old site. Check that it still sounds like you. The Amazon title ("Software engineer, Prime Gaming") is still my inference. Add years if you want them.
6. **Notes.** Replace `src/content/notes/placeholder.md` with a real note, or delete it (the page then says "Nothing published yet"). Add `draft: true` to keep a note out of production builds.
7. **Upgrade Node and Astro.** Install Node 22+, then `npm install astro@latest @astrojs/check@latest`. `npm audit` flags XSS advisories in Astro below 7.3.2. They're low risk for a static site with only your own content, but the upgrade clears them.
8. **Social preview image.** Add a 1200×630 image to `public/` and an `og:image` tag in `src/layouts/BaseLayout.astro`. A grid of the project glyphs would make a good one.
9. **Custom domain** (optional). Set `site` in `astro.config.mjs`, change `base` to `"/"`, and add `public/CNAME`.
10. **Deploy when ready.** Merge `rebuild-2026` into `main`, then run `npm run deploy`. That pushes to the `gh-pages` branch, so do it only once the TODO badges are gone.

## Earlier decisions that still hold

- **Astro 5 + TypeScript, static output.** Zero framework JS by default. TypeScript uses the `strictest` preset, and `npm run build` runs `astro check` first. Astro 5.18 is the newest release that runs on Node 20.
- **Same GitHub Pages deploy.** `base: "/website"`, internal links go through `withBase()` in `src/lib/url.ts`, `public/.nojekyll` keeps the `_astro/` directory from being dropped, and `gh-pages --dotfiles` publishes it.
- **Visible TODOs.** Any project, contact link, or note with a `todo` field renders a dashed amber TODO badge.
- **Dark mode.** Follows the system setting with JS off. The toggle saves an explicit choice, and an inline script applies it before first paint.
- **Accessibility.** Skip link, landmarks, one `h1` per page, visible focus rings, `aria-pressed` on the toggle and filters, `aria-current` in the nav, and a polite live region for the filter description. The springy headline is hidden from screen readers, which get the plain text. Each card is fully clickable through its title link, and Visit/Code stay separately focusable.
