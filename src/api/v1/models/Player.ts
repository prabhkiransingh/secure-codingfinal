export interface Player {
    id: string;
    name: string;
    teamId: string;
    role: "batsman" | "bowler" | "all-rounder" | "wicketkeeper";
    runs: number;
    wickets: number;
    average: number;
  }
  