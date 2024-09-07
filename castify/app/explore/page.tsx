"use client";

import { ShowPreviewsGrid } from "@/components/ShowPreviewsGrid";
import { genresMap } from "@/utils/constants";
import { TPodcastPreview } from "@/utils/types";
import { useEffect, useState } from "react";

interface Props {
  searchParams: { genre?: string };
}

export default function ExplorePage({ searchParams }: Props) {
  const [shows, setShows] = useState<TPodcastPreview[] | "loading" | "error">(
    "loading"
  );

  useEffect(() => {
    const getPreviews = async () => {
      const previews = await fetch("https://podcast-api.netlify.app/shows", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .catch((error) => "error");

      if (searchParams.genre) {
        filterByGenre(previews);
      } else {
        setShows(previews);
      }
    };

    getPreviews();
  }, [searchParams]);

  /**
   * Filters the provided list of shows based on the genre specified in the search parameters.
   *
   * It sets the loading state, finds the matching genre by title, and filters shows that belong to that genre.
   * The filtered shows are then set for display.
   *
   * @param {TPodcastPreview[]} showsList - The array of podcast shows to filter.
   */
  const filterByGenre = (showsList: TPodcastPreview[]) => {
    setShows("loading");
    const genre = genresMap.find((genre) => genre.title === searchParams.genre);

    const filteredShows = showsList.filter((show) =>
      show.genres.includes(genre!.id)
    );
    setShows(filteredShows);
  };

  // TODO: implement design for error state
  /* ---------- ERROR STATE DISPLAY ---------- */
  if (shows === "error") {
    return <div className="wrapper">An unexpected error occured!</div>;
  }

  return (
    <div className="wrapper">
      <ShowPreviewsGrid showsToDisplay={shows} />
    </div>
  );
}
