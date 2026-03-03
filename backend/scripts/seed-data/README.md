# Seed Data

Images used by the seed script live in `images/`.

## Adding images

1. Place images in `scripts/seed-data/images/`
2. Reference by filename in `data/data.json` (e.g. `aboutus.jpg`, `favicon.png`)
3. Run `node scripts/seed.js` (after clearing DB for re-seed)

## Production-ready

- Images are in the repo (CI/CD friendly)
- Programmatic upload avoids manual steps
- Duplicate check: existing files by name are reused
