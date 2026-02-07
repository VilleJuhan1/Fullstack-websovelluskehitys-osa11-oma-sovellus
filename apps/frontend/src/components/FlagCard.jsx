// The main game card: flag image, choices, and result text.
export default function FlagCard({ flag, name, choices, result, onGuess, onNext }) {
  return (
    <section className="card">
      <div className="flag">
        <img src={flag} alt={`Flag of ${name}`} />
      </div>
      <div className="choices">
        {choices.map((choice) => (
          <button
            key={choice.name}
            type="button"
            onClick={() => onGuess(choice)}
            className="choice"
            disabled={Boolean(result)}
          >
            {choice.name}
          </button>
        ))}
      </div>
      <div className="actions">
        {result && (
          <p
            className={
              result.correct ? "result result--ok" : "result result--bad"
            }
          >
            {result.message}
          </p>
        )}
        <button type="button" className="next" onClick={onNext}>
          Next flag
        </button>
      </div>
    </section>
  );
}
