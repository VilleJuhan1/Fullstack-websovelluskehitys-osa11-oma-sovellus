import { Router } from "express";
import { fetchJson, mapCountry } from "../lib/restcountries.js";

const router = Router();

// Return a slimmed-down list of all countries and flags.
router.get("/countries", async (req, res) => {
  try {
    const data = await fetchJson("/all");
    const mapped = data.map(mapCountry).filter((country) => country.name && country.flag);
    res.json(mapped);
  } catch (error) {
    res.status(error.status || 502).json({ error: "Failed to fetch countries." });
  }
});

// Return one or more countries that match the provided name.
router.get("/countries/:name", async (req, res) => {
  try {
    const data = await fetchJson(
      `/name/${encodeURIComponent(req.params.name)}`
    );
    const mapped = data.map(mapCountry).filter((country) => country.name && country.flag);
    res.json(mapped);
  } catch (error) {
    res.status(error.status || 502).json({ error: "Failed to fetch country." });
  }
});

export default router;
