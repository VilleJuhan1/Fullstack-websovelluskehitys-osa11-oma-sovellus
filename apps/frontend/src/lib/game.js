// Small helpers for choosing answers in the flag game.
export function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Build the 4 options: the answer plus three random alternatives.
export function buildChoices(countries, answer) {
  const others = countries.filter((country) => country !== answer);
  const picks = shuffle(others).slice(0, 3);
  return shuffle([answer, ...picks]);
}
