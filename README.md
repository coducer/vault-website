# Vault

A monorepo with **Strapi** (headless CMS) backend and **Next.js** frontend.

## Prerequisites

- Node.js 20+
- npm 6+

## Quick Start (Local Development)

### Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

Strapi runs at [http://localhost:1337](http://localhost:1337). Create an admin user on first run.

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at [http://localhost:3000](http://localhost:3000).

Ensure the backend is running so the frontend can fetch content from Strapi.

## Docker

Run both services in containers:

```bash
# Copy env examples for each service
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Build and start
docker compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend (Strapi)**: [http://localhost:1337](http://localhost:1337)

Docker Compose loads environment from `backend/.env` and `frontend/.env`. The frontend's `STRAPI_URL` is overridden to `http://strapi:1337` for server-side API calls between containers. For local development, `frontend/.env.example` uses `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` so media URLs work in the browser.

### Environment Variables

See the example files for full variable lists:

- **Backend**: [backend/.env.example](backend/.env.example) – Strapi keys, database, SMTP, etc.
- **Frontend**: [frontend/.env.example](frontend/.env.example) – `NEXT_PUBLIC_STRAPI_URL` (Strapi URL for client-side)

## Project Structure

```
vault/
├── backend/     # Strapi CMS
├── frontend/    # Next.js app
└── docker-compose.yml
```

- [backend/README.md](backend/README.md) – Strapi development and deployment
- [frontend/README.md](frontend/README.md) – Next.js development and deployment
