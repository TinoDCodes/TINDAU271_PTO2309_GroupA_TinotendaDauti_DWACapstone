"use client";

import { PageErrorUI } from "@/components/PageErrorUI";
import { SeasonTile } from "@/components/SeasonTile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TPodcastShow } from "@/utils/types";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { showId: string };
}

export default function ShowPage({ params }: Props) {
  const router = useRouter();
  const [show, setShow] = useState<TPodcastShow | "loading" | "error">(
    "loading"
  );

  /**
   * Fetches details for a specific podcast show based on the show ID from the URL parameters.
   *
   * 1. Sends a request to the podcast API using the show ID from `params`.
   * 2. If the request succeeds, the show data is parsed and stored in the state via `setShow`.
   * 3. If an error occurs during the fetch, the state is still updated with the error response.
   *
   */
  useEffect(() => {
    const getShow = async () => {
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${params.showId}`
      )
        .then((res) => res.json())
        .catch(() => "error");

      setShow(response);
    };

    getShow();
  }, [params.showId]);

  const handleOnSeasonClick = (seasonId: number) => {
    router.push(`/show/${params.showId}/season/${seasonId}`);
  };

  /* ---------- LOADING STATE DISPLAY ---------- */
  if (show === "loading") {
    return (
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="w-full h-[25rem] md:h-[36rem] lg:h-[40rem]" />

        <div className="flex flex-col gap-3">
          <Skeleton className="w-full h-[4rem] md:h-[5rem] lg:h-[6rem]" />
          <Skeleton className="w-full h-[4rem] md:h-[5rem] lg:h-[6rem]" />
          <Skeleton className="w-full h-[4rem] md:h-[5rem] lg:h-[6rem]" />
          <Skeleton className="w-full h-[4rem] md:h-[5rem] lg:h-[6rem]" />
        </div>
      </div>
    );
  }

  /* ---------- ERROR STATE DISPLAY ---------- */
  if (show === "error") {
    return (
      <PageErrorUI text="Sorry, we couldn't load the data for this show. Please try again or contact support if the problem persists." />
    );
  }

  return (
    <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* ---- LHS or TOP section depending on display size ---- */}
      <section className="w-full md:h-full flex flex-col gap-2 md:gap-4 items-center md:justify-center bg-muted/60 pb-4 md:py-4 lg:py-8 rounded-t-lg md:rounded-lg">
        <Image
          src={show.image}
          alt="Show Cover Image"
          height={336}
          width={336}
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 35vw, 70vw"
          className="h-[20rem] w-full md:w-[19rem] rounded-t-lg rounded-b-none md:rounded-lg"
          priority
        />

        <h2 className="text-xl lg:text-2xl text-center font-bold font-raleway max-w-72 lg:max-w-[24rem] xl:max-w-[30rem]">
          {show.title}
        </h2>

        <p className="text-[0.6rem] lg:text-xs text-center max-w-72 lg:max-w-[24rem] xl:max-w-[30rem] line-clamp-6">
          {show.description}
        </p>

        {/* genres */}
        <small className="text-xs lg:text-sm text-[#845ec2] text-center max-w-72 lg:max-w-[24rem] xl:max-w-[30rem]">
          <span className="font-semibold text-black dark:text-white/70">
            genres:&nbsp;&nbsp;
          </span>
          {show.genres && show.genres.join(", ")}
        </small>

        <small className="text-xs lg:text-sm text-zinc-500 dark:text-white/65">
          updated: {format(new Date(show.updated), "PP")}
        </small>

        <p className="text-xs lg:text-sm font-semibold text-[#ff9671]">
          {show.seasons.length} {show.seasons.length > 1 ? "seasons" : "season"}
        </p>
      </section>

      {/* ---- RHS or BOTTOM section depending on display size ---- */}
      <ScrollArea className="w-full h-full max-h-[37rem] lg:max-h-[40rem]">
        <div className="p-4">
          {show.seasons.map((season) => (
            <div key={season.season}>
              <SeasonTile
                season={season}
                onSeasonClick={() => handleOnSeasonClick(season.season)}
              />
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
