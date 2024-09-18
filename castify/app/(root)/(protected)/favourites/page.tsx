"use client";

import { FavouriteEpisodeTile } from "@/components/FavouriteEpisodeTile";
import { PageErrorUI } from "@/components/PageErrorUI";
import { ShareFavouritesDialog } from "@/components/ShareFavouritesDialog";
import { SortShows } from "@/components/SortShows";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { DbUserFavourite, TSortOptionValue } from "@/utils/types";
import { type User } from "@supabase/supabase-js";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  searchParams: {
    sort?: TSortOptionValue;
  };
}

export default function FavouritesPage({ searchParams }: Props) {
  const supabase = createClient();

  const [user, setUser] = useState<User>();
  const [favourites, setFavourites] = useState<
    DbUserFavourite[] | "loading" | "error"
  >("loading");

  /**
   * Sorts an array of user favourites based on the sort option from the search parameters.
   *
   * 1. 'titleAsc' - Sorts by title from A to Z.
   * 2. 'titleDesc' - Sorts by title from Z to A.
   * 3. 'dateAsc' - Sorts by date updated in ascending order.
   * 4. 'dateDesc' - Sorts by date updated in descending order.
   *
   * @param {TPodcastPreview[]} shows - The array of podcast shows to sort.
   * @returns {TPodcastPreview[]} The sorted array of podcast shows.
   */
  const sortFavourites = useCallback(
    (favouriteEpisodes: DbUserFavourite[]) => {
      const sortOption = searchParams.sort;

      switch (sortOption) {
        case "titleAsc":
          return favouriteEpisodes.sort((a, b) =>
            a.show_title.localeCompare(b.show_title)
          );

        case "titleDesc":
          return favouriteEpisodes.sort((a, b) =>
            b.show_title.localeCompare(a.show_title)
          );

        case "dateAsc":
          return favouriteEpisodes.sort(
            (a, b) =>
              new Date(a.show_updated).getTime() -
              new Date(b.show_updated).getTime()
          );

        case "dateDesc":
          return favouriteEpisodes.sort(
            (a, b) =>
              new Date(b.show_updated).getTime() -
              new Date(a.show_updated).getTime()
          );

        default:
          return favouriteEpisodes; // Return original array if no matching sort option
      }
    },
    [searchParams.sort]
  );

  /**
   * Fetches the user's favourite episodes from the database, ordered by show and season, and updates the state.
   *
   * @param {User} currentUser - The currently authenticated user.
   */
  const refreshFavourites = useCallback(
    async (currentUser: User) => {
      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("show_id")
        .order("season_id", { ascending: true });

      if (!error) {
        let sortedFavourites = data;
        if (searchParams.sort) {
          sortedFavourites = sortFavourites(sortedFavourites);
        }
        setFavourites(sortedFavourites);
      } else {
        console.error(error.message, { code: error.code });
        setFavourites("error");
      }
    },
    [supabase, searchParams.sort, sortFavourites]
  );

  /**
   * Fetches the authenticated user and their favourites, and updates the state. (when the page loads)
   */
  useEffect(() => {
    const getUser = async () => {
      setFavourites("loading");
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (!userError && userData.user) {
        setUser(userData.user);
        await refreshFavourites(userData.user);
      } else {
        console.error(userError?.message, { code: userError?.code });
        setFavourites("error");
      }
    };

    getUser();
  }, [supabase, refreshFavourites, searchParams.sort]);

  /**
   * Removes an episode from the user's favourites and updates the UI accordingly.
   *
   * @param {DbUserFavourite} episode - The episode to remove from favourites.
   */
  const handleRemoveEpisodeFromFavourites = async (
    episode: DbUserFavourite
  ) => {
    if (!user) return;

    const toastId = toast.loading("Removing episode from favourites", {
      className: "dark:bg-black/85 dark:text-white/95",
    });

    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("show_id", episode.show_id)
      .eq("season_id", episode.season_id)
      .eq("episode_id", episode.episode_id);

    if (error) {
      console.error(error.message, { code: error.code });
      toast.error("Failed to remove episode from favourites", {
        id: toastId,
      });
    } else {
      await refreshFavourites(user);
      toast.success("Episode removed from favourites", {
        id: toastId,
      });
    }
  };

  /*---------- LOADING STATE ----------*/
  if (favourites === "loading") {
    return (
      <div className="wrapper flex flex-col gap-3">
        <h2 className="font-raleway font-extrabold text-center text-base lg:text-lg text-zinc-500 dark:text-white/85">
          Favourite Episodes
        </h2>
        <Skeleton className="w-full h-[8rem]" />
        <Skeleton className="w-full h-[8rem]" />
        <Skeleton className="w-full h-[8rem]" />
        <Skeleton className="w-full h-[8rem]" />
      </div>
    );
  }

  /*---------- ERROR STATE ----------*/
  if (favourites === "error") {
    return (
      <PageErrorUI text="Sorry, something went wrong. Please try again or contact support if the problem persists." />
    );
  }

  return (
    <div className="wrapper dark:text-white">
      <h2 className="mb-2 font-raleway font-extrabold text-center text-base lg:text-lg text-zinc-500 dark:text-white/85">
        Favourite Episodes
      </h2>

      {favourites.length < 1 ? (
        /* ---- View when there are no favourites ---- */
        <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
          <Image
            src="/icons/polar-bear.svg"
            alt="Like icon"
            height={128}
            width={128}
            sizes="(min-width: 1024px) 128px, 96px"
            className="h-24 w-24 lg:h-32 lg:w-32 opacity-65 dark:opacity-75"
          />

          <h4 className="font-semibold text-center text-zinc-600 dark:text-white/90">
            No favourites yet
          </h4>
          <small className="text-center text-zinc-400 dark:text-zinc-300">
            Keep track of your favourite epsiodes by clicking the ❤ icon.
          </small>
        </article>
      ) : (
        /* ---- View when there are favourites ---- */
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <ShareFavouritesDialog user={user} />
            <SortShows />
          </div>

          <section className="flex flex-col gap-3 mt-4">
            {favourites.map((item) => (
              <FavouriteEpisodeTile
                key={item.id}
                favourite={item}
                removeFavourite={() => handleRemoveEpisodeFromFavourites(item)}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
