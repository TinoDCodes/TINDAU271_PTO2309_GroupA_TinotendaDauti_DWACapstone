"use client";

import { FavouriteEpisodeTile } from "@/components/FavouriteEpisodeTile";
import { SortShows } from "@/components/SortShows";
import { createClient } from "@/utils/supabase/client";
import { DbUserFavourite } from "@/utils/types";
import { type User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FavouritesPage() {
  const supabase = createClient();

  const [user, setUser] = useState<User>();
  const [favourites, setFavourites] = useState<
    DbUserFavourite[] | "loading" | "error"
  >("loading");

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
        setFavourites(data);
      } else {
        console.error(error.message, { code: error.code });
        setFavourites("error");
      }
    },
    [supabase]
  );

  /**
   * Fetches the authenticated user and their favourites, and updates the state. (when the page loads)
   */
  useEffect(() => {
    const getUser = async () => {
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
  }, [supabase, refreshFavourites]);

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
    return <div className="wrapper">loading....</div>;
  }

  /*---------- ERROR STATE ----------*/
  if (favourites === "error") {
    return <div className="wrapper">Oops something happened</div>;
  }

  return (
    <div className="wrapper dark:text-white">
      {favourites.length < 1 ? (
        /* ---- View when there are no favourites ---- */
        <>No favourites found</>
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="font-raleway font-extrabold text-center text-base lg:text-lg text-zinc-500 dark:text-white/85">
            Favourite Episodes
          </h2>

          <SortShows />

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
