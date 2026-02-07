import { useEffect, useMemo, useState } from "react";
import GameHeader from "./components/GameHeader.jsx";
import FlagCard from "./components/FlagCard.jsx";
import { buildChoices } from "./lib/game.js";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [current, setCurrent] = useState(null);
  const [choices, setChoices] = useState([]);
  const [status, setStatus] = useState("loading");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    streak: 0
  });

  // Fetch the list of countries once on load.
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await fetch("/api/countries");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        if (!active) return;
        setCountries(data);
        setStatus("ready");
      } catch (error) {
        if (!active) return;
        setStatus("error");
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const hasCountries = countries.length > 3;

  // Start a new round by picking a random country and 3 decoys.
  const nextRound = () => {
    if (!hasCountries) return;
    const answer = countries[Math.floor(Math.random() * countries.length)];
    setCurrent(answer);
    setChoices(buildChoices(countries, answer));
    setResult(null);
  };

  // Auto-start the first round when data is ready.
  useEffect(() => {
    if (status === "ready" && hasCountries && !current) {
      nextRound();
    }
  }, [status, hasCountries, current]);

  const title = useMemo(() => {
    if (status === "loading") return "Loading flags...";
    if (status === "error") return "Failed to load flags";
    return "Guess the flag";
  }, [status]);

  // Handle a user guess and update stats.
  const handleGuess = (choice) => {
    if (!current) return;
    if (choice.name === current.name) {
      setResult({ correct: true, message: "Correct!" });
      setStats((prev) => ({
        correct: prev.correct + 1,
        incorrect: prev.incorrect,
        streak: prev.streak + 1
      }));
    } else {
      setResult({
        correct: false,
        message: `Nope, that was ${current.name}.`
      });
      setStats((prev) => ({
        correct: prev.correct,
        incorrect: prev.incorrect + 1,
        streak: 0
      }));
    }
  };

  return (
    <main className="app">
      <GameHeader title={title} stats={stats} />

      {status === "error" && (
        <div className="card card--error">
          <p>Try again later.</p>
        </div>
      )}

      {status === "ready" && current && (
        <FlagCard
          flag={current.flag}
          name={current.name}
          choices={choices}
          result={result}
          onGuess={handleGuess}
          onNext={nextRound}
        />
      )}
    </main>
  );
}
