import type { ShortlistData } from "../types";

export const shortlistFixture: ShortlistData = {
  title: "Rodri successors",
  subtitle: "Shortlist · CM profiles · U-22",
  filters: ["CM profile", "Age ≤ 22", "Min 1,500", "EU market"],
  rows: [
    { name: "João Neves", age: 20, team: "Benfica", pos: "CM", fit: 94, xg: "0.21", val: "€45m", status: "brand" },
    { name: "Warren Zaïre-Emery", age: 20, team: "PSG", pos: "CM", fit: 91, xg: "0.18", val: "€65m", status: "neutral" },
    { name: "Archie Gray", age: 19, team: "Tottenham", pos: "CM/RB", fit: 88, xg: "0.09", val: "€32m", status: "neutral" },
    { name: "Kobbie Mainoo", age: 21, team: "Man United", pos: "CM", fit: 86, xg: "0.14", val: "€55m", status: "warning" },
    { name: "Lewis Miley", age: 20, team: "Newcastle", pos: "CM", fit: 82, xg: "0.12", val: "€22m", status: "neutral" },
  ],
};
