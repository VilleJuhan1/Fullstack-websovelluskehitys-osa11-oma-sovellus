// Compact readout of game stats shown under the title.
export default function Stats({ correct, incorrect, streak }) {
  return (
    <div className="stats">
      <div className="stat">
        <span className="stat__label">Correct</span>
        <span className="stat__value" data-testid="stat-correct">
          {correct}
        </span>
      </div>
      <div className="stat">
        <span className="stat__label">Incorrect</span>
        <span className="stat__value" data-testid="stat-incorrect">
          {incorrect}
        </span>
      </div>
      <div className="stat">
        <span className="stat__label">Streak</span>
        <span className="stat__value" data-testid="stat-streak">
          {streak}
        </span>
      </div>
    </div>
  );
}
