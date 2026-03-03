# Seed Data

Images used by the seed script live in `images/`.

## Referenced images

Place these files in `scripts/seed-data/images/` for full seed coverage:

| Filename | Used by |
|----------|---------|
| `aboutus.jpg` | About (hero), Vault Story (hero), News, Events, CEO Letter (avatar/image), Our Story (items), Team, Operating Partner, Events Page (hero), Home Partner With Us (item icons), Blog (fallback) |
| `favicon.png` | Global (favicon) |
| `default-image.png` | Global (default SEO share image) |

Using `aboutus.jpg` as the single placeholder covers all optional media. Add `favicon.png` and `default-image.png` for global branding.

## Adding images

1. Place images in `scripts/seed-data/images/`
2. Reference by filename in `data/data.json`
3. Run `npm run seed` (or `node scripts/seed.js && node scripts/set-permissions.js`)

## Re-seeding

The seed runs only on first run. To re-seed after updating `data.json`:

1. Clear the database (e.g. delete `backend/.tmp/data.db` for SQLite)
2. Run `npm run seed`

## Production-ready

- Images are in the repo (CI/CD friendly)
- Programmatic upload avoids manual steps
- Duplicate check: existing files by name are reused
