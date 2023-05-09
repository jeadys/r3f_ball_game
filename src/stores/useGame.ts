import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type PhaseType = "ready" | "playing" | "ended";

type GameState = {
  trapCount: number;
  phase: PhaseType;
};

type GameActions = {
  start: () => void;
  restart: () => void;
  end: () => void;
};

const initialState: GameState = {
  trapCount: 3,
  phase: "ready",
};

export const useGameStore = create<GameState & GameActions>()(
  subscribeWithSelector((set) => ({
    ...initialState,

    start: () => {
      set((state) => {
        if (state.phase === "ready") return { phase: "playing" };
        return {
          ...state,
        };
      });
    },

    restart: () => {
      set((state) => {
        if (state.phase === "playing" || state.phase === "ended")
          return { phase: "ready" };
        return {
          ...state,
        };
      });
    },

    end: () => {
      set((state) => {
        if (state.phase === "playing") return { phase: "ended" };
        return {
          ...state,
        };
      });
    },
  }))
);
