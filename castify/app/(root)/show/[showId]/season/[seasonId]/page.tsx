"use client";

import { EpisodeTile } from "@/components/EpisodeTile";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TPodcastSeason } from "@/utils/types";
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
  const [season, setSeason] = useState<TPodcastSeason | "loading" | "error">(
    "loading"
  );

  useEffect(() => {
    const getSeason = async () => {
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${params.showId}`
      )
        .then((res) => res.json())
        .catch((error) => "error");

      if (response !== "error") {
        const seasonFound = response.seasons.find(
          (item: TPodcastSeason) => item.season.toString() === params.seasonId
        );
        seasonFound ? setSeason(seasonFound) : setSeason("error");
      } else {
        setSeason(response);
      }
    };

    getSeason();
  }, []);

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
            className="h-20 w-20 lg:h-28 lg:w-28 opacity-25"
          />

          <strong className="text-sm lg:text-base text-center text-zinc-400">
            Sorry, we couldn't load the data for this season. Please try again
            or contact support if the problem persists.
          </strong>
        </article>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <section className="w-full flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between md:bg-violet-50 md:px-2 md:py-4 rounded-md">
        <Link
          href={`/show/${params.showId}`}
          className="text-sm mr-auto md:mr-0 lg:text-base flex items-center gap-2 lg:gap-3 text-zinc-500 hover:scale-95"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back
        </Link>

        <article className="min-w-full md:min-w-0 flex items-center gap-4 bg-violet-50 md:bg-none py-2 rounded-md px-5 md:p-0">
          <Image
            src={season.image}
            alt="cover image"
            height="0"
            width="0"
            sizes="100vw"
            className="md:hidden h-[6rem] w-[5rem] rounded"
          />
          <div className="flex flex-col gap-1 items-center justify-center text-center text-[#845ec2]">
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
          <EpisodeTile key={episode.episode} episode={episode} />
        ))}
      </section>
    </div>
  );
}
