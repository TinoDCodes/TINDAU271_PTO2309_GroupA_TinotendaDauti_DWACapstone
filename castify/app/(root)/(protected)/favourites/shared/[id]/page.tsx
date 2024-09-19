"use client";

import { FavouriteEpisodeTile } from "@/components/FavouriteEpisodeTile";
import { PageErrorUI } from "@/components/PageErrorUI";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserIdFromShareableLink } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/client";
import { DbUserFavourite } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function SharedFavouritesPage({ params }: Props) {
  const supabase = createClient();

  const [sharedFavourites, setSharedFavourites] = useState<
    DbUserFavourite[] | "loading" | "error"
  >("loading");

  useEffect(() => {
    const getSharedFavourites = async () => {
      const { data, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("user_id", getUserIdFromShareableLink(params.id))
        .order("show_id")
        .order("season_id", { ascending: true });

      if (error) {
        console.error(error.message, { code: error.code });
        setSharedFavourites("error");
      } else {
        setSharedFavourites(data);
      }
    };

    getSharedFavourites();
  }, [supabase, params]);

  /*---------- LOADING STATE ----------*/
  if (sharedFavourites === "loading") {
    return (
      <div className="wrapper flex flex-col gap-3">
        <h2 className="font-raleway font-extrabold text-center text-base lg:text-lg text-zinc-500 dark:text-white/85">
          Shared Favourites
        </h2>
        <Skeleton className="w-full h-[8rem]" />
        <Skeleton className="w-full h-[8rem]" />
        <Skeleton className="w-full h-[8rem]" />
        <Skeleton className="w-full h-[8rem]" />
      </div>
    );
  }

  /*---------- ERROR STATE ----------*/
  if (sharedFavourites === "error") {
    return (
      <PageErrorUI text="Sorry, something went wrong. Please try again or contact support if the problem persists." />
    );
  }

  return (
    <div className="wrapper dark:text-white">
      <h2 className="mb-2 font-raleway font-extrabold text-center text-base lg:text-lg text-zinc-500 dark:text-white/85">
        Shared Favourites
      </h2>

      {sharedFavourites.length < 1 ? (
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

          <small className="text-center text-zinc-400 dark:text-zinc-300">
            There are currently no episodes in this shared favourites list. Once
            the user adds episodes to the list you will be able to see them
            here.
          </small>
        </article>
      ) : (
        /* ---- View when there are favourites ---- */
        <div className="flex flex-col gap-3">
          <section className="flex flex-col gap-3 mt-4">
            {sharedFavourites.map((item) => (
              <FavouriteEpisodeTile
                key={item.id}
                favourite={item}
                isShared={true}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
