import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type PhaseType = "ready" | "playing" | "ended";

type GameState = {
  trapCount: number;
  trapSeed: number;
  phase: PhaseType;
  startTime: number;
  endTime: number;
};

type GameActions = {
  start: () => void;
  restart: () => void;
  end: () => void;
};

const initialState: GameState = {
  trapCount: 10,
  trapSeed: 0,
  phase: "ready",
  startTime: 0,
  endTime: 0,
};

export const useGameStore = create<GameState & GameActions>()(
  subscribeWithSelector((set) => ({
    ...initialState,

    start: () => {
      set((state) => {
        if (state.phase === "ready")
          return { phase: "playing", startTime: Date.now() };
        return {
          ...state,
        };
      });
    },

    restart: () => {
      set((state) => {
        if (state.phase === "playing" || state.phase === "ended")
          return { phase: "ready", trapSeed: Math.random() };
        return {
          ...state,
        };
      });
    },

    end: () => {
      set((state) => {
        if (state.phase === "playing")
          return { phase: "ended", endTime: Date.now() };
        return {
          ...state,
        };
      });
    },
  }))
);
