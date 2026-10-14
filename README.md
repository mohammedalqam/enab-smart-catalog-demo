# ENAB SMART CATALOG

An Arabic-first interactive catalog concept for **ENAB CANDY | عنب كاندي**, designed and developed by **0MAR WEB STUDIO** (the first character is the digit zero).

This is an independent, clearly labeled concept demo. ENAB CANDY has not approved or supplied this project. All 30 product names, images, descriptions, “new” labels and availability states are illustrative. No real prices or store inventory are represented.

## Features

- Exactly 30 distinct demo products: chocolate 6, candy 6, snacks 5, drinks 4, biscuits 4, gift boxes 3 and bundles 2.
- Instant Arabic/English/partial search, Arabic normalization, synonyms and restrained typo tolerance.
- Category counts, new/featured/available filters, alphabetical sorting, combined filters and reset.
- Accessible native-dialog product details with quantity selection, Escape, focus restoration and background scroll lock.
- Shopping list with quantities, removal, clear and validated versioned LocalStorage persistence.
- Copyable inquiry preview. **Nothing is sent.** No WhatsApp number, checkout or payment integration.
- Featured/new product rails, optional recent views, `/` search shortcut and reduced-motion support.
- Local WebP images, self-hosted Cairo fonts, RTL, responsive layouts and `noindex` metadata.

## Stack and setup

Next.js 16.4.1, React 19.3.1, TypeScript, Tailwind CSS 4, Motion, Lucide and Fuse.js. No backend, database, auth, paid API or secrets are needed.

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm test
npm run verify:assets
npm run build
```

`next build` produces a static `out/` directory. A lockfile is included. Motion uses the lightweight LazyMotion entrypoint; product images below the hero are lazily loaded.

## Configuration and product data

Change `src/config/catalog.config.ts` for brand names, links, demo flags and versioned storage keys. `productCount` is descriptive; it never creates or limits products. The real count comes from `src/data/products.ts` and is checked by tests.

`src/data/products.ts` defines the shared product source used by search, every product rail, details and the shopping list:

```ts
type Product = {
  id: string; nameAr: string; nameEn: string; category: CategoryId;
  descriptionAr: string; image: string; price?: number; currency?: string;
  tags: string[]; searchKeywords: string[];
  isNew: boolean; isFeatured: boolean; isAvailable: boolean;
};
```

Replace demo rows with verified store data and replace local images with authorized photographs. Keep identifiers stable when possible, add category synonyms and update the tests for the intended real count. Image filenames must point to real files. Replace notices only after the owner authorizes an official catalog.

Do not enable real orders by toggling a flag: this code intentionally has no sending implementation. Real inquiry sending, verified contact details, stock/prices, and any product-management workflow require a separate scoped implementation.

## Deployment

### Vercel

Import this repository into an existing **Pro or Enterprise** team, select `main`, framework Next.js, build `npm run build`, install `npm ci`, output `out`. `vercel.json` supplies these settings and a noindex header. Git integration can then deploy `main` automatically.

Vercel Hobby is restricted to noncommercial personal use. This proposed sales preview promotes professional work; do not deploy it there or upgrade billing without owner approval. Vercel deployment remains pending if the only available team is Hobby.

### Static concept preview

The static, non-transactional portfolio demonstration can also be exported for a project path:

```sh
npm run build:pages
```

This sets the public asset base to `/enab-smart-catalog-demo`. Serve `out/` on the corresponding static path. `.github/workflows/pages.yml` runs the checks and exports/deploys this concept to GitHub Pages automatically on pushes to `main`. GitHub repository Settings → Pages must use **GitHub Actions** as the source. The preview does not run a store, accept transactions, offer SaaS or collect visitor data. Reassess hosting terms before converting it into an operating commercial catalog.

`responsive-preview.html` is an unlinked, noindex QA harness that embeds the same live catalog in true iframe viewports of 320, 360, 375, 390, 430, 768, 1024 and 1440 CSS pixels. It is not a product feature.

## Assets

See `ASSET-SOURCES.md`. Product photos and hero are original generated concept imagery, not screenshots and not ENAB CANDY's actual products. Screenshots used for delivery must be captured from the real deployed interface.

## Limitations and future conversion

The demo has no backend, payment, customer records, inventory integration, admin dashboard or real order sending. LocalStorage is device/browser-specific and can be cleared by the browser. Availability is illustrative. The copying action requires browser clipboard permission; if unavailable, the text is selected for manual copying.

For hundreds of products, replace the seed data with a validated catalog import, optimize image sizes and search indexing, and agree an update workflow with the owner. A static catalog can still work without a database. Frequently edited data, authenticated administration, live stock or transactional ordering would require additional development. Never describe a large catalog as live inventory without an actual inventory integration.
