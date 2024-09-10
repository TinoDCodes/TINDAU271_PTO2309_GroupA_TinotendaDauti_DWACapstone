"use client";

import { ShowPreviewsGrid } from "@/components/ShowPreviewsGrid";
import { TPodcastPreview } from "@/utils/types";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

interface Props {
  searchParams: {
    title: string;
  };
}

const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["title"],
};

export default function SearchPage({ searchParams }: Props) {
  const [showsFound, setShowsFound] = useState<
    TPodcastPreview[] | "loading" | "not-found"
  >("loading");

  /**
   * Fetches podcast shows and performs a fuzzy search based on the title specified in the search parameters.
   *
   * 1. Fetches the list of shows from the API.
   * 2. Uses Fuse.js for fuzzy searching with the user's title input.
   * 3. If matching shows are found, sets the search results. If no matches are found or an error occurs, sets the state to "not-found".
   *
   * Dependencies:
   * - Runs whenever `searchParams` changes.
   */
  useEffect(() => {
    const getShows = async () => {
      setShowsFound("loading");
      const shows = await fetch("https://podcast-api.netlify.app/shows", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .catch(() => "error");

      if (shows !== "error") {
        const fuse = new Fuse(shows, fuseOptions);
        const found = fuse.search(searchParams.title);

        if (found.length > 0) {
          const results = found.map((show) => show.item);
          setShowsFound(results as TPodcastPreview[]);
        } else {
          setShowsFound("not-found");
        }
      } else {
        setShowsFound("not-found");
      }
    };

    getShows();
  }, [searchParams]);

  /* ---------- ERROR STATE DISPLAY ---------- */
  if (showsFound === "not-found") {
    return (
      <div className="wrapper w-full h-full">
        <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <strong className="text-sm lg:text-base text-center text-zinc-400">
            No results found for &quot;{searchParams.title}&quot;.
          </strong>
          <p className="text-sm lg:text-base text-center text-zinc-400 font-medium">
            Adjust your search keywords and try again!
          </p>
        </article>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <h5 className="text-zinc-400 font-extrabold lg:text-lg">
        search results for &quot;{searchParams.title}&quot;
      </h5>

      <ShowPreviewsGrid showsToDisplay={showsFound} />
    </div>
  );
}
