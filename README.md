# Upperkai website

Static company site for upperkai.com, built with [Astro](https://astro.build). Every page is plain HTML generated at build time and ships no JavaScript.

## Run it

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # makes share images, then builds to dist/
npm run preview   # serve dist/ locally
```

Node 22.12 or newer.

## Adding content

- **A product:** copy `src/content/products/jambcbt.md`, rename it (the file name becomes the URL, e.g. `budget-buddy.md` → `/products/budget-buddy`), fill in the front matter and put its screenshot in `src/assets/images/` as `upperkai-<product>-<screen>.webp`.
- **A blog post:** add a `.md` file to `src/content/blog/` with the same front matter as the existing posts. Set `product:` to the product's file name to link them under "Related".
- **A new page:** add an `.astro` file in `src/pages/` using the `Base` layout with a unique `title` and `description`.

The sitemap (`/sitemap.xml`) picks up new pages, products and posts automatically, and each product and post gets its own 1200×630 share image on the next build.

## Placeholders to replace

Everything in `[square brackets]` is a placeholder. Search the project for `[` to find them all:

- `src/content/products/*.md`: product names, benefits, descriptions, features, categories, platforms. Replace or delete the three sample products.
- `src/assets/images/upperkai-product-*-dashboard.webp`: placeholder screens. Swap in real screenshots (any size works, 3:2 looks best).
- `src/site.ts`: social profile URLs. Profiles still holding a placeholder are left out of the structured data.
- `src/pages/about.astro`: company story, registered details, team.
- `src/pages/privacy.astro`, `src/pages/terms.astro`: dates, address, jurisdiction, providers. Have a lawyer review both.
- `src/content/blog/*.md`: three starter posts by "The Upperkai team". Edit, re-date or replace them before launch.

## Hosting (Netlify)

`netlify.toml` is set up for Netlify:

1. Connect the repository in Netlify. The build command and publish folder come from `netlify.toml`.
2. Add `upperkai.com` as the primary domain and `www.upperkai.com` as an alias. HTTPS is issued automatically, and `www` redirects to the bare domain with a 301.
3. **Forms:** the contact form and newsletter sign-up use Netlify Forms, which works without any code. In Site settings → Forms → Form notifications, add an email notification to `hello@upperkai.com` for the `contact` form. Newsletter sign-ups are listed under the `newsletter` form, and you can export them from there.
4. After the first deploy, submit `https://upperkai.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

Netlify's free tier includes 100 form submissions a month.

## SEO checklist (built in)

- Static HTML with `lang="en"`, real URLs with no trailing slashes, one `<h1>` per page.
- Unique title, description and self-referencing canonical on every page; Open Graph and Twitter tags with a 1200×630 image.
- JSON-LD: Organization and WebSite (home), SoftwareApplication (products), BlogPosting (posts), BreadcrumbList (products and posts).
- `/sitemap.xml` and `/robots.txt` generated at build time.
- WebP images with width and height set, responsive `srcset`, lazy loading below the fold.
- One self-hosted variable font (Plus Jakarta Sans, Latin subset, preloaded).
