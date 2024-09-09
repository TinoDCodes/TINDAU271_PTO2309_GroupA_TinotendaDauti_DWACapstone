"use client";

import { TPodcastPreview } from "@/utils/types";
import { Preview } from "./Preview";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";

interface Props {
  shows: TPodcastPreview[];
  section: "might-like" | "most-recent";
}

/**
 * Returns a list of 10 randomly selected unique podcast shows from the provided list.
 *
 * This function picks 10 unique random items from the input array of podcasts.
 * If the list contains fewer than 10 items, the entire list is returned.
 * The function does not mutate the original list.
 *
 * @param {TPodcastPreview[]} list - The array of podcast shows to choose from.
 * @returns {TPodcastPreview[]} An array containing up to 10 randomly selected unique podcast shows.
 */
function getRandomShows(list: TPodcastPreview[]): TPodcastPreview[] {
  const randomShowsList: TPodcastPreview[] = [];
  const availableIndexes = new Set<number>();

  // Make sure not to exceed the list length if it's less than 10
  const picks = Math.min(10, list.length);

  while (randomShowsList.length < picks) {
    const randomIndex = Math.floor(Math.random() * list.length);

    // Check if the index has already been used
    if (!availableIndexes.has(randomIndex)) {
      availableIndexes.add(randomIndex);
      randomShowsList.push(list[randomIndex]);
    }
  }

  return randomShowsList;
}

/**
 * Returns a list of the 10 most recently updated podcast shows from the provided list.
 *
 * This function sorts the podcast shows by the `updated` date in descending order
 * (i.e., most recent first) and returns the top 10. If the list contains fewer than 10 shows,
 * it returns the entire list.
 *
 * @param {TPodcastPreview[]} list - The array of podcast shows to sort by their updated date.
 * @returns {TPodcastPreview[]} An array containing up to 10 of the most recently updated podcast shows.
 */
function getMostRecentShows(list: TPodcastPreview[]) {
  const recentShowsList = list
    .sort(
      (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
    )
    .slice(0, 10);

  return recentShowsList;
}

export const HomeShowsCarousel = ({ shows, section }: Props) => {
  const [showsToDisplay, setShowsToDisplay] = useState<
    TPodcastPreview[] | "loading"
  >("loading");

  /**
   * Updates the displayed shows based on the current section.
   *
   * If the section is "might-like", it selects random shows for the user.
   * If the section is "most-recent", it selects the most recently updated shows.
   * The effect runs whenever the `shows` array changes.
   */
  useEffect(() => {
    if (shows.length > 0 && section === "might-like") {
      const showsUserMightLike = getRandomShows(shows);
      setShowsToDisplay(showsUserMightLike);
    }

    if (shows.length > 0 && section === "most-recent") {
      const mostRecentShows = getMostRecentShows(shows);
      setShowsToDisplay(mostRecentShows);
    }
  }, [shows, section]);

  if (showsToDisplay === "loading") {
    return (
      <div className="mt-2 flex gap-2 xl:gap-4">
        <Skeleton className="w-[7rem] md:w-[9rem] lg:w-[13rem] h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-[7rem] md:w-[9rem] lg:w-[13rem] h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-[7rem] md:w-[9rem] lg:w-[13rem] h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="hidden md:flex w-[7rem] md:w-[9rem] lg:w-[13rem] h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="hidden md:flex w-[7rem] md:w-[9rem] lg:w-[13rem] h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="hidden xl:flex w-[7rem] md:w-[9rem] lg:w-[13rem] h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="hidden xl:flex w-[7rem] md:w-[9rem] lg:w-[13rem] h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
      </div>
    );
  }

  return (
    <Carousel className="lg:mt-1 w-full">
      <CarouselContent className="lg:pl-4">
        {showsToDisplay.map((show) => (
          <CarouselItem
            key={show.id}
            className="basis-1/3 md:basis-[22%] lg:basis-1/5 xl:basis-1/6 pb-2"
          >
            <Preview previewShow={show} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:block" />
      <CarouselNext className="hidden lg:block" />
    </Carousel>
  );
};
