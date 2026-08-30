# Bhaktivoice

Your companion on the spiritual journey.

A production-minded Next.js platform for naam jaap, katha, yatra, temples, festivals, sadhana, community, and the Bhakti Store — with SEO built into the architecture from day one.

## Stack

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS 4
- Turso (libSQL) for user jaap, sankalp, and diary data
- Firebase Google sign-in

## Run locally

```bash
cd C:\Users\jaina\Desktop\bhakti
copy .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site renders fully without Firebase or Turso. Sign-in and cloud jaap sync activate once credentials are set.

## Environment

Copy `.env.example` to `.env.local`.

### Site URL

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use `https://www.bhaktivoice.com` in production (`NEXT_PUBLIC_SITE_URL` and `SITE_ORIGIN`). The apex `bhaktivoice.com` 301s to www.

### Firebase Google login

Create a Firebase project, enable Google authentication, and add your web app keys:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Add `http://localhost:3000`, `www.bhaktivoice.com`, and `bhaktivoice.com` to Firebase authorized domains.

### Turso

Create a database, then apply `src/lib/db/schema.sql` in the Turso shell:

```bash
turso db shell bhakti < src/lib/db/schema.sql
```

```
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

On first Google sign-in, `/api/auth/sync` upserts the user. Jaap counts POST to `/api/jaap`.

## SEO architecture

Indexable first-class URLs (not everything under `/blog`):

```
/naam-jaap
/mantras/[slug]
/katha/[slug]
/yatra/[slug]
/temples/[slug]
/festivals/[slug]
/spirituality/[slug]
/blog/[slug]
/store/[slug]
```

Private surfaces are `noindex` and listed in `robots.txt`: profile, account, settings, cart, checkout, search results, API.

Sitemaps:

- `/sitemap.xml`
- `/sitemap-pages.xml`
- `/sitemap-blog.xml`
- `/sitemap-yatra.xml`
- `/sitemap-temples.xml`
- `/sitemap-festivals.xml`
- `/sitemap-mantras.xml`
- `/sitemap-products.xml`

Content lives in `src/lib/content/` so metadata, canonicals, related links, and JSON-LD stay out of presentational components.

Festival dates follow the lunar calendar and must be reviewed annually — pages do not invent a fixed 2026 date as fact. Temple timings and travel details ask readers to confirm locally.

## Product loop

Discover → Learn → Chant → Sankalp → Track (diary) → Community → Yatra → Share → Return.

### 🌐 Our Other Products

We’re also building **Wikawe** — a privacy-focused, all-in-one platform for working with documents and files.

🔗 **[Wikawe](https://www.wikawe.online)** — https://www.wikawe.online

Wikawe brings together powerful document tools, PDF utilities, OCR, AI-powered document features, **Wikawe Drive**, and **peer-to-peer (P2P) file transfers** in one simple platform.

> **Wikawe — Your files. Your tools. Your privacy.**

