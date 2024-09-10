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

export const AudioPlayer = () => {
  const {
    currentlyPlaying,
    closePlayer,
    currentAudioTime: currentTime,
    isAudioPlaying: isPlaying,
    setCurrentAudioTime: setCurrentTime,
    setIsAudioPlaying: setIsPlaying,
  } = usePlayerStore((state: PlayerState) => state);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const PlayPauseIcon = isPlaying ? PauseIcon : PlayIcon;
  const VolumeIcon = isMuted ? VolumeXIcon : Volume2Icon;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load(); // This forces the audio element to load the new source
      audioRef.current.currentTime = currentTime;
    }
  }, [currentlyPlaying]);

  // Format time (e.g., 120 seconds => "2:00")
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Update progress bar and current time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // When metadata is loaded, set the duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Play or pause audio
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

  // Mute or Umute the audio
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

  const handleResetPlayer = () => {
    if (audioRef.current) {
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
    <div className="wrapper sticky bottom-0 z-50">
      <div className="w-full h-fit bg-[#4b4453df] rounded-lg flex flex-col gap-2 lg:gap-3 items-center justify-center py-2 lg:py-4">
        <audio
          ref={audioRef}
          src={currentlyPlaying?.file}
          key={currentlyPlaying?.file} // Add this line to force a re-render
          onLoadStart={() => setLoading(true)}
          onLoadedData={() => setLoading(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleResetPlayer}
          preload="metadata"
          autoPlay
        />

        {/* ---- PLAYING EPISODE'S TITLE ---- */}
        <h3 className="text-zinc-50 text-center tex-sm lg:text-base max-w-[16rem] md:maw-w-[25rem] truncate">
          {currentlyPlaying.title}
        </h3>

        {/* ---- AUDIO PROGRESS BAR & TIME STAMPS ---- */}
        <div className="flex items-center gap-3">
          <small className="text-zinc-50">{formatTime(currentTime)}</small>

          <Slider
            value={[currentTime]}
            max={duration}
            className="w-[14rem] md:w-[20rem] lg:w-[28rem] bg-zinc-100 rounded"
            onValueChange={(value) => {
              if (audioRef.current) audioRef.current.currentTime = value[0];
            }}
          />

          <small className="text-zinc-50">{formatTime(duration)}</small>
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
