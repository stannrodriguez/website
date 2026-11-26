# Copy audit: website

## Issues found and changes made

- **Home page title lacked role context** (`src/data/site.ts`): changed `site.title` from `"Stephanie Rodriguez"` to `"Stephanie Rodriguez · Software engineer"` so browser tabs and social previews show her role while matching the site's `·` separator.
- **Default meta description shifted voice** (`src/data/site.ts`): tightened `site.description` to remove the abrupt switch from fragment to first person and mention both websites and tools.
- **Social card alt text missed printed text and used CSS jargon** (`src/layouts/BaseLayout.astro`): updated `ogImageAlt` to include `"Software engineer"` (shown on `public/og-card.png`) and removed redundant `"Light-themed"` and `"plain system type"` phrasing.
- **About page reused the home meta description** (`src/pages/about.astro`): added a page-specific `description` summarizing background, work history, and contact links.
- **404 page was vague and had an unclear pronoun** (`src/pages/404.astro`): updated title, meta description, heading (`"Page not found"`), body copy, and link text (`"Go to the home page"`).
- **Empty contact fallback sounded like a draft note** (`src/components/ContactList.astro`): changed `"not added yet"` to `"not available"`.
- **Notion featured summary had loose phrasing** (`src/data/featured.ts`): changed `", like"` to `", including"` for cleaner parallel phrasing without altering scope.
- **Project summaries repeated titles or truncated on single-line rows** (`src/data/projects.ts`): tightened 9 summaries (`nanosecond`, `aplysium`, `radix`, `emotion-atlas`, `laws-and-adages`, `reach`, `sound-physics`, `browser`, `simple-ann`) to remove title repetition, filler, and dangling clauses while keeping all facts intact.
- **README omitted scripts, Node version, and featured data** (`README.md`): documented `npm run check`, `npm run preview`, the local dev URL, Node 20.3+, `src/data/featured.ts`, and `scripts/share-images.mjs`.

## Left alone on purpose

- **Home intro (`src/pages/index.astro`)**: Stephanie's personal greeting (`"Hi, I'm Stephanie."`) and statement (`"I like building tools..."`).
- **About bio paragraphs (`src/pages/about.astro`)**: personal biography written in Stephanie's voice.
- **Work history titles, companies, and year ranges (`src/data/site.ts`)**: résumé facts and structured date ranges (en dashes in year spans, not prose).
- **Assembled, Neopom, and Prime Gaming featured hooks (`src/data/featured.ts`)**: already concise, factual, and scoped to the featured brief.
- **Remaining project entries (`src/data/projects.ts`)**: `spin`, `nightfall`, `throughline`, `metaphors`, `loan-app`, and `potato-detector` are already concise or carry personal voice; `neopom` and `nanosecond.status` are unrendered reference data.
- **Navigation, footer, skip link, and `REBUILD_NOTES.md`**: `"Projects"` / `"About"` match the copy on `/about/`, `"Skip to content"` and footer copyright are standard, and `REBUILD_NOTES.md` is internal history.
