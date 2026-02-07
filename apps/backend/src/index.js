import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 3001;
const RESTCOUNTRIES_BASE =
  "https://studies.cs.helsinki.fi/restcountries/api";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDistCandidates = [
  path.resolve(process.cwd(), "apps/frontend/dist"),
  path.resolve(__dirname, "../../frontend/dist")
];
const frontendDist = frontendDistCandidates.find((dir) => fs.existsSync(dir));

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const message = await response.text();
    const error = new Error(
      `Upstream error ${response.status}: ${message || response.statusText}`
    );
    error.status = response.status;
    throw error;
  }
  return response.json();
}

function mapCountry(country) {
  return {
    name: country?.name?.common,
    flag: country?.flags?.png || country?.flags?.svg
  };
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/countries", async (req, res) => {
  try {
    const data = await fetchJson(`${RESTCOUNTRIES_BASE}/all`);
    const mapped = data.map(mapCountry).filter((country) => country.name && country.flag);
    res.json(mapped);
  } catch (error) {
    res
      .status(error.status || 502)
      .json({ error: "Failed to fetch countries." });
  }
});

app.get("/api/countries/:name", async (req, res) => {
  try {
    const data = await fetchJson(
      `${RESTCOUNTRIES_BASE}/name/${encodeURIComponent(req.params.name)}`
    );
    const mapped = data.map(mapCountry).filter((country) => country.name && country.flag);
    res.json(mapped);
  } catch (error) {
    res
      .status(error.status || 502)
      .json({ error: "Failed to fetch country." });
  }
});

// Serve the built frontend when running the single-service deployment.
if (frontendDist) {
  console.log(`Serving frontend from ${frontendDist}`);
  app.use(express.static(frontendDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
} else {
  console.warn(
    "Frontend build not found. Run `npm run build` to create apps/frontend/dist."
  );
}

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
