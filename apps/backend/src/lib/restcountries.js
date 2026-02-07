const RESTCOUNTRIES_BASE =
  "https://studies.cs.helsinki.fi/restcountries/api";

// Fetch JSON from the upstream Rest Countries API with simple error handling.
export async function fetchJson(path) {
  const response = await fetch(`${RESTCOUNTRIES_BASE}${path}`);
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

// Convert the upstream response into the smaller shape we return to the client.
export function mapCountry(country) {
  return {
    name: country?.name?.common,
    flag: country?.flags?.png || country?.flags?.svg
  };
}
