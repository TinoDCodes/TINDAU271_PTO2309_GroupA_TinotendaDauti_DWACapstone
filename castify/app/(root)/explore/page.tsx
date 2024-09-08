"use client";

import { ShowPreviewsGrid } from "@/components/ShowPreviewsGrid";
import { SortShows } from "@/components/SortShows";
import { genresMap } from "@/utils/constants";
import { TPodcastPreview, TSortOptionValue } from "@/utils/types";
import Image from "next/image";
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

  /**
   * Fetches podcast show previews and applies filtering and sorting based on the URL search parameters.
   *
   * The effect performs the following:
   * 1. Sets the shows state to "loading" while fetching data from the podcast API.
   * 2. If the fetch is successful, it optionally filters the shows by genre and sorts them according to the search parameters.
   * 3. If the fetch fails, the state is set to "error".
   * 4. The search parameters (`genre` and `sort`) control filtering and sorting of the fetched shows.
   *
   * Dependencies:
   * - Runs whenever `searchParams` changes.
   */
  useEffect(() => {
    const getPreviews = async () => {
      setShows("loading");
      const previews = await fetch("https://podcast-api.netlify.app/shows", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .catch((error) => "error");

      if (previews !== "error") {
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
      } else {
        setShows(previews);
      }
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

  /* ---------- ERROR STATE DISPLAY ---------- */
  if (shows === "error") {
    return (
      <div className="wrapper w-full h-full">
        <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <Image
            src="/icons/error-triangle.svg"
            alt="Error icon"
            height="0"
            width="0"
            sizes="100vw"
            className="h-20 w-20 lg:h-28 lg:w-28 opacity-25"
          />

          <strong className="text-sm lg:text-base text-center text-zinc-400">
            Sorry, something went wrong. Please try again or contact support if
            the problem persists.
          </strong>
        </article>
      </div>
    );
  }

  return (
    <div className="wrapper flex flex-col gap-2">
      <SortShows />
      <ShowPreviewsGrid showsToDisplay={shows} />
    </div>
  );
}
