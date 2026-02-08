# Fullstack Flag Game

Monorepo with a React (Vite) frontend and a Node.js (Express) backend. The UI shows a flag and four options to guess the country and the current session statistics.

**The app's base functionality is almost entirely coded with OpenAI Codex!** This is mainly because at the time, it was a brand new tool and I wanted to see how it works, if it works. However the code has been thoroughly reviewed to understand the underlying logic and to request documentation, refactoring etc. Also some changes have been done manually after reviews. As for the pilot results themselves, the Codex seems to deliver fairly good results on smaller projects like this. This was ofc. the assumption also, as the context is really small and similar web apps are plentiful in the training and reference materials. Still, seems a bit like witchcraft!

The app is a very distant fork from the earlier parts of the course where we built a react app for searching information from various countries. The backend of this app uses the same API as that course app, but passes a list of only two values, common name and flag url to the frontend.

You can test [the live game here](https://fullstack-websovelluskehitys-osa11-oma.onrender.com)! However, as it's on free tier platform, the app might be hibernating and take some time to spin up.

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
