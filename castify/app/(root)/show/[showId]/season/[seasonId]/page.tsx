"use client";

import { EpisodeTile } from "@/components/EpisodeTile";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayerState, usePlayerStore } from "@/store/podcastPlayer";
import { createEpisodeIdentifier } from "@/utils/helpers";
import { TPodcastEpisode, TPodcastSeason } from "@/utils/types";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  params: {
    showId: string;
    seasonId: string;
  };
}

export default function SeasonPage({ params }: Props) {
  const { setCurrentlyPlaying } = usePlayerStore((state: PlayerState) => state);

  const [season, setSeason] = useState<TPodcastSeason | "loading" | "error">(
    "loading"
  );

  /**
   * Fetches a specific podcast season based on the showId and seasonId URL parameters.
   *
   * - The function first makes a fetch request to a public API with the show ID.
   * - If successful, it looks for the season matching the `seasonId` in the URL params.
   * - If the fetch or data processing fails, the season is set to "error".
   *
   * The effect is re-triggered when `seasonId` or `showId` in the `params` object changes.
   */
  useEffect(() => {
    const getSeason = async () => {
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${params.showId}`
      )
        .then((res) => res.json())
        .catch(() => "error");

      if (response !== "error") {
        // Find the season based on the seasonId in the URL params
        const seasonFound = response.seasons.find(
          (item: TPodcastSeason) => item.season.toString() === params.seasonId
        );
        setSeason(seasonFound || "error");
      } else {
        setSeason(response);
      }
    };

    getSeason();
  }, [params.seasonId, params.showId]);

  /**
   * Handles the click event to play a selected podcast episode.
   *
   * @description
   * - Extracts the `showId` and `seasonId` from the URL parameters.
   * - Uses `createEpisodeIdentifier` to generate a unique identifier for the episode.
   * - Updates the currently playing episode in the global state with the episode data and identifier.
   *
   * @param {TPodcastEpisode} episode - The podcast episode object to be played.
   */
  const handleEpisodePlayClick = (episode: TPodcastEpisode) => {
    const { showId, seasonId } = params;
    const episodeIdentifier = createEpisodeIdentifier(
      showId,
      seasonId,
      episode.episode
    );
    setCurrentlyPlaying({ ...episode, identifier: episodeIdentifier });
  };

  /* ---------- LOADING STATE DISPLAY ---------- */
  if (season === "loading") {
    return (
      <div className="wrapper flex flex-col gap-3 lg:gap-4">
        <Skeleton className="w-full h-[6rem] lg:h-[7rem]" />
        <Skeleton className="w-full h-[6rem] lg:h-[7rem]" />
        <Skeleton className="w-full h-[6rem] lg:h-[7rem]" />
        <Skeleton className="w-full h-[6rem] lg:h-[7rem]" />
      </div>
    );
  }

  /* ---------- ERROR STATE DISPLAY ---------- */
  if (season === "error") {
    return (
      <div className="wrapper w-full h-full">
        <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <Image
            src="/icons/error-triangle.svg"
            alt="Error icon"
            height="0"
            width="0"
            sizes="100vw"
            className="h-20 w-20 lg:h-28 lg:w-28 opacity-25 dark:invert dark:opacity-75"
          />

          <strong className="text-sm lg:text-base text-center text-zinc-400 dark:text-zinc-200">
            Sorry, we couldn&apos;t load the data for this season. Please try
            again or contact support if the problem persists.
          </strong>
        </article>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <section className="w-full flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between md:bg-violet-50 dark:md:bg-zinc-800 md:px-2 md:py-4 rounded-md">
        <Link
          href={`/show/${params.showId}`}
          className="text-sm mr-auto md:mr-0 lg:text-base flex items-center gap-2 lg:gap-3 text-zinc-500 dark:text-zinc-200 hover:scale-95 transition"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back
        </Link>

        <article className="min-w-full md:min-w-0 flex items-center gap-4 bg-violet-50 dark:bg-zinc-800 md:bg-none py-2 rounded-md px-5 md:p-0">
          <Image
            src={season.image}
            alt="cover image"
            height="0"
            width="0"
            sizes="100vw"
            className="md:hidden h-[6rem] w-[5rem] rounded"
          />
          <div className="flex flex-col gap-1 items-center justify-center text-center text-[#845ec2] dark:text-white">
            <h5 className="text-xs lg:text-sm font-medium">
              Season {season.season}
            </h5>
            <h4 className="font-bold text-sm lg:text-lg max-w-56 lg:max-w-none">
              {season.title}
            </h4>
          </div>
        </article>

        <Image
          src={season.image}
          alt="cover image"
          height="0"
          width="0"
          sizes="100vw"
          className="hidden md:flex md:h-[6rem] md:w-[5rem] lg:h-[7rem] lg:w-[6rem] rounded"
        />
      </section>

      <section className="flex flex-col gap-4 mt-4 pb-6">
        <Badge variant="secondary" className="mx-auto font-semibold">
          {season.episodes.length} episodes
        </Badge>

        {season.episodes.map((episode) => (
          <EpisodeTile
            key={episode.episode}
            identifier={createEpisodeIdentifier(
              params.showId,
              params.seasonId,
              episode.episode
            )}
            episode={episode}
            onPlayClick={() => handleEpisodePlayClick(episode)}
          />
        ))}
      </section>
    </div>
  );
}
