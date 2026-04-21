import type { BlogData } from "../types";

export const blogFixture: BlogData = {
  featured: {
    tag: "PREMIER LEAGUE · MEN",
    meta: "MD 28 · Tactical deep dive · 12 min",
    title: "The Rodri problem: why Arsenal's press kept bouncing off Pep's pivot",
    excerpt:
      "84 touches. 94% completion. A PPDA contribution that rewrote how Arteta has to plan for the Etihad. We ran the ball-time data against three different press-traps…",
    author: "Priya Nair",
    authorInitials: "PN",
    ago: "2h ago",
    up: 342,
    comm: 58,
  },
  categories: ["All", "Match reports", "Tactical", "Scouting", "Women's game", "Homegrown watch", "Sentiment", "Deep dive"],
  posts: [
    { tag: "WSL · WOMEN", title: "Chelsea W's left-side overload is breaking Arsenal W's back-three", author: "Ada Koch", read: "6 min", up: 218, comm: 42, color: "#60A5FA" },
    { tag: "HOMEGROWN", title: "Ethan Nwaneri at 17: the progression-passing numbers no one is talking about", author: "Léa Moreau", read: "8 min", up: 412, comm: 87, color: "#4ADE80" },
    { tag: "SENTIMENT", title: "Fan pulse: Man United's second-half collapses are training a learned helplessness", author: "Malik Osei", read: "5 min", up: 189, comm: 204, color: "#EF4444" },
    { tag: "LA LIGA · MEN", title: "Girona without Gazzaniga: defensive xG ballooning, PPDA halving", author: "Javier Ruiz", read: "7 min", up: 156, comm: 28, color: "#FACC15" },
    { tag: "INJURIES", title: "The soft-tissue spike across Europe this MD — what the load data says", author: "Priya Nair", read: "10 min", up: 276, comm: 64, color: "#EF4444" },
    { tag: "NWSL · WOMEN", title: "Trinity Rodman's progressive carry map is the most exciting thing in the league", author: "Ada Koch", read: "4 min", up: 301, comm: 71, color: "#60A5FA" },
  ],
};
