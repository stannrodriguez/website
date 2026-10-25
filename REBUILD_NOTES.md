# Rebuild notes (October 2026)

The site was rebuilt from scratch on the `rebuild-2026` branch. The old React force-graph prototype is gone from the working tree but still in git history (last commit `964b56c`). Nothing has been pushed or deployed.

## Running it

```sh
npm install
npm run dev       # http://localhost:4321/website/
npm run build     # type-checks (astro check), then builds to dist/
npm run preview   # serves dist/ locally
npm run deploy    # builds, then publishes dist/ to the gh-pages branch (pushes to origin)
```

Node 20.3 or newer works. See the upgrade TODO below.

## Decisions

**Astro 5 + TypeScript, static output.** A personal site is mostly text, so Astro fits: it ships zero framework JavaScript by default. The only JS on the page is the theme toggle, a few hundred bytes inlined. TypeScript is on the `strictest` preset, and `npm run build` runs `astro check` first, so type errors fail the build.

**Astro 5, not 7.** Astro 6.0.6+ and 7 need Node 22, and this machine has Node 20. Astro 5.18 is the newest release that runs here. The move up is mechanical and listed in the TODOs.

**Same deploy as before.** The `base` is still `/website` and `npm run deploy` still uses `gh-pages`, so the URL stays `https://stannrodriguez.github.io/website/`. Two fixes were needed for Astro:

- `public/.nojekyll`. Without it, GitHub Pages runs Jekyll, which drops any directory that starts with `_`. Astro puts all CSS and fonts in `_astro/`.
- `gh-pages --dotfiles`. Without it, gh-pages leaves `.nojekyll` out of the publish.

**Content as typed data.** Copy lives where you can edit it without touching layout:

| What | Where |
| --- | --- |
| Name, meta description, nav, contact links, career list | `src/data/site.ts` |
| Projects | `src/data/projects.ts` |
| Writing | `src/content/notes/*.md` (schema in `src/content.config.ts`) |
| Hero and About copy | `src/pages/index.astro` |

**Visible TODOs.** Any project, contact link, or note with a `todo` field renders a dashed amber **TODO** badge plus a note saying what's missing. Placeholders can't go live unnoticed. Delete the `todo` field once an entry is real.

**Design.** The look is editorial and typographic: one serif family (Source Serif 4, self-hosted variable font with an optical-size axis), a monospace for small metadata, and a single warm accent. Section labels sit in a left rail on wide screens and stack above their content on narrow ones. Colors are OKLCH tokens in `src/styles/global.css`, with matching light and dark sets.

**Dark mode.** The site follows the system setting even with JS off. The toggle appears once JS runs and saves an explicit choice to `localStorage`. A small inline script in `<head>` applies the saved choice before first paint, so there's no flash. Code blocks in notes switch Shiki themes to match.

**Accessibility.** The page has a skip link and semantic landmarks, one `h1` per page, and every section is labelled by its heading. Focus rings are visible. The toggle exposes its state with `aria-pressed`. Smooth scrolling is off when the user prefers reduced motion. Body and muted text were picked to clear WCAG AA contrast in both themes.

**Copy.** Hero and About are adapted from your own words on the old site (background, finance → engineering, Neopom, the "serve a good purpose / leave the person better" test). I added the framing around forward-deployed and applied AI work. Everything is plain first person. I left out credentials and numbers I couldn't verify.

**What I didn't do.** The pstack skills (architect, principle-\*, unslop) aren't installed in this environment, so I applied the same ideas by hand: small typed modules, no unused abstractions, and plain copy. I also couldn't take browser screenshots here, so the layout was checked through the built HTML and type checks, not by eye. Open `npm run dev` and look at it at phone and desktop widths in both themes before you ship.

## TODOs for Stephanie

Highest value first.

1. **Projects** (`src/data/projects.ts`). Replace the two placeholders with real applied AI and customer-facing work. For each one, say what the problem was, who had it, what you shipped, and one number that shows it worked. For Neopom and the browser, confirm the details and add a year and links.
2. **Contact** (`src/data/site.ts`). Add a public email (I deliberately didn't publish your personal address), a LinkedIn URL, and a résumé PDF in `public/`. Confirm `github.com/stannrodriguez` is the profile you want linked.
3. **Hero and About** (`src/pages/index.astro`). Read them out loud and change anything that doesn't sound like you. The hero line ("I build software with the people who'll use it") is the one most worth making your own.
4. **Career list** (`src/data/site.ts`). Check the titles; "Software engineer" at Notion and Amazon is my inference. Add years if you want them.
5. **Writing.** Replace `src/content/notes/placeholder.md` with a real note, or delete it (the section then says "Nothing published yet"). Add `draft: true` to keep a note out of production builds.
6. **Upgrade Node and Astro.** Install Node 22+, then `npm install astro@latest @astrojs/check@latest`. `npm audit` flags XSS advisories in Astro below 7.3.2. They're low risk for a static site with only your own content, but the upgrade clears them.
7. **Social preview image.** Add a 1200×630 image to `public/` and an `og:image` tag in `src/layouts/BaseLayout.astro`.
8. **Custom domain** (optional). Set `site` in `astro.config.mjs`, change `base` to `"/"`, and add `public/CNAME`.
9. **Deploy when ready.** Merge `rebuild-2026` into `main`, then run `npm run deploy`. That pushes to the `gh-pages` branch, so do it only once the TODO badges are gone.
