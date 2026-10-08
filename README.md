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

## Hosting (Firebase)

`firebase.json` serves `dist/` on Firebase Hosting, with clean URLs (`/about`, not `/about.html`), no trailing slashes, long caching for `/_astro/*` and the security headers. `firestore.rules` holds the database rules for the forms.

1. Put the project ID in `.firebaserc` and the project ID and web API key in `src/site.ts` (`firebase`). The API key is in Project settings → Your apps → Web app.
2. Deploy with `firebase deploy --only hosting,firestore`. This runs `npm run build` first.
3. In Hosting → Add custom domain, add `upperkai.com`, then add `www.upperkai.com` and choose to redirect it to `upperkai.com`. Firebase issues HTTPS for both.
4. After the first deploy, submit `https://upperkai.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

**Forms:** the contact form saves to the `contactMessages` collection and the newsletter sign-up to `newsletterSignups` in Firestore (`src/scripts/forms.ts`). Read them in the Firebase console under Firestore Database. The rules let the website add entries but not read, change or delete them. Firebase does not email you about new messages; check the console, or add the "Trigger Email" extension later.

## SEO checklist (built in)

- Static HTML with `lang="en"`, real URLs with no trailing slashes, one `<h1>` per page.
- Unique title, description and self-referencing canonical on every page; Open Graph and Twitter tags with a 1200×630 image.
- JSON-LD: Organization and WebSite (home), SoftwareApplication (products), BlogPosting (posts), BreadcrumbList (products and posts).
- `/sitemap.xml` and `/robots.txt` generated at build time.
- WebP images with width and height set, responsive `srcset`, lazy loading below the fold.
- One self-hosted variable font (Plus Jakarta Sans, Latin subset, preloaded).
