"use client";

import { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import {
  Loader2,
  PauseIcon,
  PlayIcon,
  Square,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { PlayerState, usePlayerStore } from "@/store/podcastPlayer";
import { formatTimeStamp } from "@/utils/helpers";
import usePageLeavePrompt from "@/hooks/pageClosePrompt";

export const AudioPlayer = () => {
  const {
    playerHistory,
    currentlyPlaying,
    closePlayer,
    currentAudioTime: currentTime,
    isAudioPlaying: isPlaying,
    setCurrentAudioTime: setCurrentTime,
    setIsAudioPlaying: setIsPlaying,
    setEpisodeLength,
    setEpisodePlayedFully,
    updatePlayHistoryProgress,
  } = usePlayerStore((state: PlayerState) => state);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * The play history of the currently playing episode from playerHistory.
   *
   * @const {TEpisodePlayHistory | undefined} episodePlayHistory
   */
  const episodePlayHistory = playerHistory.find(
    (item) => item.identifier === currentlyPlaying?.identifier
  );

  const PlayPauseIcon = isPlaying ? PauseIcon : PlayIcon;
  const VolumeIcon = isMuted ? VolumeXIcon : Volume2Icon;

  usePageLeavePrompt();

  /**
   * useEffect hook that handles loading and resetting the audio source
   * when a new episode is played.
   *
   * - Pauses and loads the new audio source.
   * - Sets the currentTime to the previously saved time if available.
   * - Resets the muted state if the volume is greater than 0.
   */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load(); // This forces the audio element to load the new source
      audioRef.current.currentTime = currentTime;
      if (audioRef.current.volume > 0) setIsMuted(false);
    }
  }, [currentlyPlaying]);

  /**
   * Handles time update event of the audio element.
   *
   * - Updates the current time in the global state.
   * - Updates the progress in the play history.
   */
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);

      if (episodePlayHistory && !episodePlayHistory.wasPlayedFully) {
        updatePlayHistoryProgress(
          currentlyPlaying!.identifier,
          audioRef.current.currentTime
        );
      }
    }
  };

  /**
   * Handles the loaded metadata event of the audio element.
   *
   * - Sets the duration of the audio when metadata is loaded.
   */
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  /**
   * Toggles the play and pause state of the audio.
   *
   * - Plays or pauses the audio depending on the current state.
   * - Updates the playing state in the global store.
   */
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying();
    }
  };

  /**
   * Toggles the mute state of the audio.
   *
   * - Mutes or unmutes the audio.
   * - Updates the muted state.
   */
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 1;
      } else {
        audioRef.current.volume = 0;
      }
    }
    setIsMuted((prev) => !prev);
  };

  /**
   * Handles the event when all audio data has loaded.
   *
   * - Sets the loading state to false.
   * - Sets the episode length in the store if not already set.
   */
  const handleOnAudioDataLoaded = () => {
    setLoading(false);
    if (
      audioRef.current &&
      currentlyPlaying &&
      !episodePlayHistory?.episodeLength
    )
      setEpisodeLength(currentlyPlaying.identifier, audioRef.current.duration);
  };

  /**
   * Resets the player state when the audio is done playing.
   *
   * - Marks the episode as fully played if it wasn't.
   * - Resets the current time and playing state.
   * - Sets the audio element's currentTime to 0.
   */
  const handleResetPlayer = () => {
    if (audioRef.current) {
      if (episodePlayHistory && !episodePlayHistory.wasPlayedFully) {
        setEpisodePlayedFully(episodePlayHistory.identifier);
      }

      setCurrentTime(0);
      setIsPlaying(false);
      audioRef.current.currentTime = 0;
    }
  };

  // Ensure that the audio player is not visible when there is nothing playing
  if (!currentlyPlaying) {
    return null;
  }

  return (
    <div className="wrapper fixed bottom-0 z-50">
      <div className="w-full h-fit bg-[#4b4453df] dark:bg-zinc-700/90 rounded-lg flex flex-col gap-2 lg:gap-3 items-center justify-center py-2 lg:py-4">
        <audio
          ref={audioRef}
          src={currentlyPlaying?.file}
          key={currentlyPlaying?.file} // Add this line to force a re-render
          onLoadStart={() => setLoading(true)}
          onLoadedData={handleOnAudioDataLoaded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleResetPlayer}
          preload="auto"
          autoPlay
        />

        {/* ---- EPISODE TITLE ---- */}
        <h3 className="text-zinc-50 text-center tex-sm lg:text-base max-w-[16rem] md:maw-w-[25rem] truncate">
          {currentlyPlaying.title}
        </h3>

        {/* ---- AUDIO PROGRESS BAR & TIME STAMPS ---- */}
        <div className="flex items-center gap-3">
          <small className="text-zinc-50">{formatTimeStamp(currentTime)}</small>

          <Slider
            value={[currentTime]}
            max={duration}
            className="w-[14rem] md:w-[20rem] lg:w-[28rem] bg-zinc-100 rounded"
            onValueChange={(value) => {
              if (audioRef.current) audioRef.current.currentTime = value[0];
            }}
          />

          <small className="text-zinc-50">{formatTimeStamp(duration)}</small>
        </div>

        <div className="flex items-center gap-6">
          {/* ---- VOLUME BUTTON ---- */}
          <button onClick={toggleMute} className="rounded-full">
            <VolumeIcon className="h-4 w-4 lg:h-5 lg:w-5 fill-zinc-200 text-zinc-200 hover:fill-white hover:text-white transition" />
          </button>

          {/* ---- PLAY / PAUSE BUTTON ---- */}
          {loading ? (
            <Loader2
              strokeWidth={3}
              className="h-5 w-5 lg:h-6 lg:w-6 text-zinc-200 animate-spin"
            />
          ) : (
            <button onClick={togglePlay} className="rounded-full">
              <PlayPauseIcon className="h-5 w-5 lg:h-6 lg:w-6 fill-zinc-200 text-zinc-200 hover:fill-white hover:text-white transition" />
            </button>
          )}

          {/* ---- STOP BUTTON ---- */}
          <button onClick={closePlayer} className="rounded-full">
            <Square className="h-3 w-3 lg:h-4 lg:w-4 fill-zinc-200 text-zinc-200 hover:fill-red-600 hover:text-red-600 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};
