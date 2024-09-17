"use client";

import { EpisodeTile } from "@/components/EpisodeTile";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayerState, usePlayerStore } from "@/store/podcastPlayer";
import { checkIsFavourite, createEpisodeIdentifier } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/client";
import {
  DbInsertFavourite,
  DbUserFavourite,
  TPodcastEpisode,
  TPodcastSeason,
} from "@/utils/types";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";
import toast from "react-hot-toast";
import { PageErrorUI } from "@/components/PageErrorUI";

interface Props {
  params: {
    showId: string;
    seasonId: string;
  };
}

export default function SeasonPage({ params }: Props) {
  const supabase = createClient();

  const { setCurrentlyPlaying } = usePlayerStore((state: PlayerState) => state);

  const [user, setUser] = useState<User>();
  const [favourites, setFavourites] = useState<DbUserFavourite[]>([]);
  const [showTitle, setShowTitle] = useState<string>("");
  const [showUpdateDate, setShowUpdateDate] = useState<string>("");
  const [season, setSeason] = useState<TPodcastSeason | "loading" | "error">(
    "loading"
  );

  /**
   * Fetches the latest list of the user's favourites from the database and updates the state.
   *
   * This function queries the 'favourites' table in the database for the authenticated user,
   * filtered by the current show and season. If successful, it updates the favourites state.
   *
   * @async
   * @function refreshFavourites
   * @param {User} currentUser - The current authenticated user object.
   * @returns {Promise<void>} - Resolves after the favourites data has been fetched and state is updated.
   */
  const refreshFavourites = useCallback(
    async (currentUser: User) => {
      const { data: favouritesData, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("user_id", currentUser.id)
        .eq("show_id", parseInt(params.showId))
        .eq("season_id", parseInt(params.seasonId));

      if (!error) {
        setFavourites(favouritesData);
      } else {
        console.error("Error fetching updated favourites:", error.message);
      }
    },
    [params.showId, params.seasonId, supabase]
  );

  /**
   * Retrieves the current authenticated user and their favourites on component load.
   *
   * This useEffect runs when the component is first rendered. It fetches the authenticated user's
   * details and retrieves their list of favourites by calling the `refreshFavourites` function.
   */
  useEffect(() => {
    const getUserAndFavourites = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (!userError) {
        setUser(userData.user);
        await refreshFavourites(userData.user);
      }
    };

    getUserAndFavourites();
  }, [supabase, refreshFavourites]);

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
        setShowTitle(response.title || "");
        setShowUpdateDate(response.updated);
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

  /**
   * Adds an episode to the user's favourites list in the database.
   *
   * This function inserts a new favourite record for the authenticated user.
   * After a successful insertion, the favourites list is refreshed to reflect
   * the latest state in the UI.
   *
   * @async
   * @function handleAddToFavourites
   * @param {TPodcastEpisode} episode - The podcast episode object containing details like episode ID, title, description, and file URL.
   * @returns {Promise<void>} - Resolves after the episode has been added to the user's favourites.
   */
  const handleAddToFavourites = async (episode: TPodcastEpisode) => {
    if (!user) return; // Ensure the user is authenticated

    const toastId = toast.loading("Adding episode to favourites", {
      className: "dark:bg-black/85 dark:text-white/95",
    });

    const favouriteRowItem: DbInsertFavourite = {
      user_id: user.id,
      show_id: parseInt(params.showId),
      show_title: showTitle,
      show_updated: showUpdateDate,
      season_id: parseInt(params.seasonId),
      episode_id: episode.episode,
      episode_title: episode.title,
      episode_description: episode.description,
      episode_file: episode.file,
    };

    const { error } = await supabase
      .from("favourites")
      .insert([favouriteRowItem]);

    if (error) {
      console.error(error.message, { code: error.code });
      toast.error("Failed to add episode to favourites", {
        id: toastId,
      });
    } else {
      await refreshFavourites(user); // Fetch latest favourites after successful insertion
      toast.success("Episode added to favourites", {
        id: toastId,
      });
    }
  };

  /**
   * Removes an episode from the user's favourites list in the database.
   *
   * This function deletes the favourite record for a given episode
   * from the authenticated user's favourites list. After a successful
   * deletion, the favourites list is refreshed to reflect the latest state in the UI.
   *
   * @async
   * @function handleRemoveFromFavourites
   * @param {TPodcastEpisode} episode - The podcast episode object to be removed from favourites.
   * @returns {Promise<void>} - Resolves after the episode has been removed from the user's favourites.
   */
  const handleRemoveFromFavourites = async (episode: TPodcastEpisode) => {
    if (!user) return;

    const toastId = toast.loading("Removing episode from favourites", {
      className: "dark:bg-black/85 dark:text-white/95",
    });

    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("show_id", parseInt(params.showId))
      .eq("season_id", parseInt(params.seasonId))
      .eq("episode_id", episode.episode);

    if (error) {
      console.error(error.message, { code: error.code });
      toast.error("Failed to remove episode from favourites", {
        id: toastId,
      });
    } else {
      await refreshFavourites(user); // Fetch latest favourites after successful deletion
      toast.success("Episode removed from favourites", {
        id: toastId,
      });
    }
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
      <PageErrorUI text="Sorry, we couldn't load the data for this season. Please try again or contact support if the problem persists." />
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
            height={96}
            width={96}
            sizes="96px"
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
          height={112}
          width={112}
          sizes="(min-width: 768px) 96px, (min-width: 1024px) 112px"
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
            user={user}
            identifier={createEpisodeIdentifier(
              params.showId,
              params.seasonId,
              episode.episode
            )}
            episode={episode}
            isFavourite={checkIsFavourite(episode.episode, favourites)}
            onPlayClick={() => handleEpisodePlayClick(episode)}
            onAddFavourites={() => handleAddToFavourites(episode)}
            onRemoveFavourites={() => handleRemoveFromFavourites(episode)}
          />
        ))}
      </section>
    </div>
  );
}
