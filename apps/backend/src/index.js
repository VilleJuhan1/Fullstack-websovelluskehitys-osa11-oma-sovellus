import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import countriesRouter from "./routes/countries.js";
import healthRouter from "./routes/health.js";

// Create the Express app instance.
const app = express();
const port = process.env.PORT || 3001;
// Resolve runtime paths for serving the frontend build.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Try common locations for the frontend build output.
const frontendDistCandidates = [
  path.resolve(process.cwd(), "apps/frontend/dist"),
  path.resolve(__dirname, "../../frontend/dist")
];
const frontendDist = frontendDistCandidates.find((dir) => fs.existsSync(dir));

// Attach API routes under /api.
app.use("/api", healthRouter);
app.use("/api", countriesRouter);

// Serve the built frontend when running the single-service deployment.
if (frontendDist) {
  console.log(`Serving frontend from ${frontendDist}`);
  // Serve static assets (JS/CSS) from the built frontend.
  app.use(express.static(frontendDist));
  // Send index.html for all other routes to support SPA routing.
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
} else {
  console.warn(
    "Frontend build not found. Run `npm run build` to create apps/frontend/dist."
  );
}

// Start the HTTP server.
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
