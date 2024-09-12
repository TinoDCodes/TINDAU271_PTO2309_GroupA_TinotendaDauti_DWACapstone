import { TAudioPlayerEpisode, TEpisodePlayHistory } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PlayerState {
  playerHistory: TEpisodePlayHistory[];
  currentlyPlaying: TAudioPlayerEpisode | undefined;
  currentAudioTime: number;
  isAudioPlaying: boolean;
  setCurrentlyPlaying: (episode: TAudioPlayerEpisode) => void;
  setCurrentAudioTime: (time: number) => void;
  setIsAudioPlaying: (value?: boolean) => void;
  setEpisodeLength: (identifier: string, time: number) => void;
  setEpisodePlayedFully: (identifier: string) => void;
  updatePlayHistoryProgress: (identifier: string, time: number) => void;
  closePlayer: () => void;
  resetPlayerHistory: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      playerHistory: [],
      currentlyPlaying: undefined,
      currentAudioTime: 0,
      isAudioPlaying: false,
      /**
       * Updates the currently playing episode to the given `episode`.
       *
       * @param episode - the episode that will be played by the audio player
       */
      setCurrentlyPlaying: (episode) =>
        set(() => {
          let episodeHistory = get().playerHistory.find(
            (item) => item.identifier === episode.identifier
          );

          if (!episodeHistory) {
            episodeHistory = {
              identifier: episode.identifier,
              wasPlayedFully: false,
            };
            return {
              playerHistory: [...get().playerHistory, episodeHistory],
              currentlyPlaying: episode,
              currentAudioTime: 0,
              isAudioPlaying: true,
            };
          }

          return {
            currentlyPlaying: episode,
            currentAudioTime: episodeHistory.progress || 0,
            isAudioPlaying: true,
          };
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
       * Sets the episode's length in it's play history record.
       * Only happens when it's the very first time the episode is being played.
       *
       * @param identifier - The unique identifier for the episode.
       * @param time - The duration of the episode in seconds.
       */
      setEpisodeLength: (identifier, time) =>
        set({
          playerHistory: get().playerHistory.map((item) =>
            item.identifier === identifier
              ? { ...item, episodeLength: time }
              : item
          ),
        }),
      /**
       * Marks an episode as watched fully in its play history record.
       *
       * @param identifier - The unique identifier for the episode.
       * @returns
       */
      setEpisodePlayedFully: (identifier) =>
        set({
          playerHistory: get().playerHistory.map((item) =>
            item.identifier === identifier
              ? { ...item, wasPlayedFully: true, progress: 0 }
              : item
          ),
        }),
      /**
       * Updates the progress of a specific episode in the play history.
       *
       * @description
       * - Finds the episode in the play history using the `identifier`.
       * - Updates the episode's `progress` property to the given `time` value.
       * - If no matching episode is found, the function does nothing.
       *
       * @param {string} identifier - The unique identifier for the episode.
       * @param {number} time - The new progress time in seconds to set for the episode.
       */
      updatePlayHistoryProgress: (identifier, time) =>
        set(() => {
          return {
            playerHistory: get().playerHistory.map((item) =>
              item.identifier === identifier
                ? { ...item, progress: time }
                : item
            ),
          };
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
      /**
       * clears the users listening history.
       */
      resetPlayerHistory: () => set({ playerHistory: [] }),
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
