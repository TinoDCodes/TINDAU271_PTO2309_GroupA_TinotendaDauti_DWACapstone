"use client";

import { useEffect } from "react";
import { usePlayerStore } from "@/store/podcastPlayer";

const usePageLeavePrompt = () => {
  const { isAudioPlaying, currentlyPlaying } = usePlayerStore((state) => state);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Check if audio is playing
      if (currentlyPlaying && isAudioPlaying) {
        // Prevent the default behavior and show a confirmation dialog
        event.preventDefault();
        event.returnValue = ""; // This is required for showing the dialog in most browsers
      }
    };

    if (isAudioPlaying) {
      // Add the beforeunload event listener if audio is playing
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      // Remove the event listener if audio is not playing
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isAudioPlaying, currentlyPlaying]);
};

export default usePageLeavePrompt;
