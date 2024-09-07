"use client";

import { ShowPreviewsGrid } from "@/components/ShowPreviewsGrid";
import { SortShows } from "@/components/SortShows";
import { genresMap } from "@/utils/constants";
import { TPodcastPreview, TSortOptionValue } from "@/utils/types";
import { useEffect, useState } from "react";

interface Props {
  searchParams: {
    genre?: string;
    sort?: TSortOptionValue;
  };
}

export default function ExplorePage({ searchParams }: Props) {
  const [shows, setShows] = useState<TPodcastPreview[] | "loading" | "error">(
    "loading"
  );

  useEffect(() => {
    const getPreviews = async () => {
      setShows("loading");
      const previews = await fetch("https://podcast-api.netlify.app/shows", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .catch((error) => "error");

      let showsSortedAndFilteredByGenre = [...previews];

      if (searchParams.genre) {
        showsSortedAndFilteredByGenre = filterByGenre(
          showsSortedAndFilteredByGenre
        );
      }

      if (searchParams.sort) {
        showsSortedAndFilteredByGenre = sortShows(
          showsSortedAndFilteredByGenre
        );
      }

      setShows(showsSortedAndFilteredByGenre);
    };

    getPreviews();
  }, [searchParams]);

  /**
   * Filters the provided list of shows based on the genre specified in the search parameters.
   *
   * It finds the matching genre by title, and filters the shows that belong to that genre.
   * The filtered list of shows is returned for further use.
   *
   * @param {TPodcastPreview[]} showsList - The array of podcast shows to filter.
   * @returns {TPodcastPreview[]} The filtered array of podcast shows that match the selected genre.
   */
  const filterByGenre = (showsList: TPodcastPreview[]) => {
    const genre = genresMap.find((genre) => genre.title === searchParams.genre);

    const filteredShows = showsList.filter((show) =>
      show.genres.includes(genre!.id)
    );

    return filteredShows;
  };

  /**
   * Sorts an array of podcast shows based on the sort option from the search parameters.
   *
   * 1. 'titleAsc' - Sorts by title from A to Z.
   * 2. 'titleDesc' - Sorts by title from Z to A.
   * 3. 'dateAsc' - Sorts by date updated in ascending order.
   * 4. 'dateDesc' - Sorts by date updated in descending order.
   *
   * @param {TPodcastPreview[]} shows - The array of podcast shows to sort.
   * @returns {TPodcastPreview[]} The sorted array of podcast shows.
   */
  const sortShows = (shows: TPodcastPreview[]) => {
    const sortOption = searchParams.sort;

    switch (sortOption) {
      case "titleAsc":
        return shows.sort((a, b) => a.title.localeCompare(b.title));

      case "titleDesc":
        return shows.sort((a, b) => b.title.localeCompare(a.title));

      case "dateAsc":
        return shows.sort(
          (a, b) =>
            new Date(a.updated).getTime() - new Date(b.updated).getTime()
        );

      case "dateDesc":
        return shows.sort(
          (a, b) =>
            new Date(b.updated).getTime() - new Date(a.updated).getTime()
        );

      default:
        return shows; // Return original array if no matching sort option
    }
  };

  // TODO: implement design for error state
  /* ---------- ERROR STATE DISPLAY ---------- */
  if (shows === "error") {
    return <div className="wrapper">An unexpected error occured!</div>;
  }

  return (
    <div className="wrapper flex flex-col gap-2">
      <SortShows />
      <ShowPreviewsGrid showsToDisplay={shows} />
    </div>
  );
}
