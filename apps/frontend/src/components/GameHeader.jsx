import Stats from "./Stats.jsx";

// Top copy for the game, plus the live stats display.
export default function GameHeader({ title, stats }) {
  return (
    <header className="app__header">
      <p className="app__eyebrow">Flag game</p>
      <h1>{title}</h1>
      <p className="app__subcopy">Pick the country that matches the flag.</p>
      <Stats
        correct={stats.correct}
        incorrect={stats.incorrect}
        streak={stats.streak}
      />
    </header>
  );
}
