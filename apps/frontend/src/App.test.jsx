import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App.jsx";

const mockCountries = [
  { name: "Finland", flag: "https://flags.test/fi.png" },
  { name: "Sweden", flag: "https://flags.test/se.png" },
  { name: "Norway", flag: "https://flags.test/no.png" },
  { name: "Denmark", flag: "https://flags.test/dk.png" },
  { name: "Iceland", flag: "https://flags.test/is.png" }
];

function mockFetchSuccess() {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCountries)
      })
    )
  );
}

describe("Flag game", () => {
  beforeEach(() => {
    mockFetchSuccess();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the quiz and shows four choices", async () => {
    const { container } = render(<App />);

    expect(screen.getByText(/loading flags/i)).toBeInTheDocument();

    await screen.findByText(/guess the flag/i);

    await waitFor(() => {
      const choices = container.querySelectorAll(".choice");
      expect(choices.length).toBe(4);
    });
  });

  it("updates stats after a guess", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await screen.findByText(/guess the flag/i);

    await waitFor(() => {
      const choices = container.querySelectorAll(".choice");
      expect(choices.length).toBe(4);
    });

    const firstChoice = container.querySelector(".choice");
    await user.click(firstChoice);

    const correct = Number(screen.getByTestId("stat-correct").textContent);
    const incorrect = Number(screen.getByTestId("stat-incorrect").textContent);
    const streak = Number(screen.getByTestId("stat-streak").textContent);

    expect(correct + incorrect).toBe(1);
    expect([0, 1]).toContain(streak);
  });
});
