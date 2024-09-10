import { TPodcastEpisode } from "@/utils/types";
import { create } from "zustand";

export interface PlayerState {
  currentlyPlaying: TPodcastEpisode | undefined;
  setCurrentlyPlaying: (episode: TPodcastEpisode) => void;
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  currentlyPlaying: undefined,
  setCurrentlyPlaying: (episode) => set({ currentlyPlaying: episode }),
}));
