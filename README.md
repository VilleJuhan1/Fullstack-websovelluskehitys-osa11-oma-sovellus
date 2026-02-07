# Fullstack Flag Game

Monorepo with a React (Vite) frontend and a Node.js (Express) backend. The UI
shows a flag and four options to guess the country.

**The app is almost entirely coded with OpenAI Codex!** This is mainly because at the time, it was a brand new tool and I wanted to see how it works, if it works. The app is a very distant fork from the earlier parts of the course where we built a react app for searching information from various countries. The backend of this app uses the same API as that course app.

## Structure

- `apps/frontend` - React app
- `apps/backend` - Express API

## Setup

1. Install dependencies

```bash
npm install
```

2. Run backend and frontend (separate terminals)

```bash
npm run dev:backend
npm run dev:frontend
```

The frontend proxies `/api` to the backend in development.

## Tests

```bash
npm run test:frontend
```

## Production build (single service)

The backend serves the built frontend from `apps/frontend/dist`, so Render can
run a single web service.

```bash
npm run build
npm run start
```

## Endpoints

- `GET /api/health` -> `{ "status": "ok" }`
- `GET /api/countries` -> list of `{ name, flag }` pairs (from the Rest Countries API)
- `GET /api/countries/:name` -> filtered list of `{ name, flag }` pairs
