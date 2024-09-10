import { TAudioPlayerEpisode } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PlayerState {
  currentlyPlaying: TAudioPlayerEpisode | undefined;
  currentAudioTime: number;
  isAudioPlaying: boolean;
  setCurrentlyPlaying: (episode: TAudioPlayerEpisode) => void;
  setCurrentAudioTime: (time: number) => void;
  setIsAudioPlaying: (value?: boolean) => void;
  closePlayer: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentlyPlaying: undefined,
      currentAudioTime: 0,
      isAudioPlaying: false,
      /**
       * Updates the currently playing episode to the given `episode`.
       *
       * @param episode - the episode that will be played by the audio player
       */
      setCurrentlyPlaying: (episode) =>
        set({
          currentlyPlaying: episode,
          currentAudioTime: 0,
          isAudioPlaying: true,
        }),
      /**
       * Updates the current audio's play time.
       *
       * @param time - the time in seconds
       */
      setCurrentAudioTime: (time) => set({ currentAudioTime: time }),
      /**
       * Updates the audio's playing state (whether it's playing or paused).
       *
       * @param [value] - a boolean value to set the state to
       */
      setIsAudioPlaying: (value) =>
        set(() => {
          if (value) return { isAudioPlaying: value };
          return { isAudioPlaying: !get().isAudioPlaying };
        }),
      /**
       * Resets all the state pertaining to the currently playing audio.
       * Which in turn closes the audio player.
       */
      closePlayer: () =>
        set({
          currentlyPlaying: undefined,
          currentAudioTime: 0,
          isAudioPlaying: false,
        }),
    }),
    {
      name: "player-storage",
      // persists all state through localStorage except for the "isAudioPlaying"
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["isAudioPlaying"].includes(key)
          )
        ),
    }
  )
);
