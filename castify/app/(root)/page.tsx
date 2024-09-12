"use client";

import { Hero } from "@/components/Hero";
import { HomeShowsCarousel } from "@/components/HomeShowsCarousel";
import { TPodcastPreview } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [shows, setShows] = useState<TPodcastPreview[] | "error">([]);

  useEffect(() => {
    const getPreviews = async () => {
      const previews = await fetch("https://podcast-api.netlify.app/shows")
        .then((res) => res.json())
        .catch(() => "error");

      setShows(previews);
    };

    getPreviews();
  }, []);

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
            className="h-20 w-20 lg:h-28 lg:w-28 opacity-25 dark:invert dark:opacity-75"
          />

          <strong className="text-sm lg:text-base text-center text-zinc-400 dark:text-zinc-200">
            Sorry, we couldn&apos;t load the podcasts. Please try again or
            contact support if the problem persists.
          </strong>
        </article>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Hero />

      {/* ---------- SHOWS USER MIGHT LIKE ---------- */}
      <section className="my-4 lg:my-8">
        <h4 className="text-sm lg:text-base font-bold font-raleway">
          👍 You might like these...
        </h4>
        <HomeShowsCarousel shows={shows} section="might-like" />
      </section>

      {/* ---------- RECENTLY AIRED SHOWS ---------- */}
      <section className="my-2 lg:my-4">
        <h4 className="text-sm lg:text-base font-bold font-raleway">
          Recently aired podcasts
        </h4>
        <HomeShowsCarousel shows={shows} section="most-recent" />
      </section>
    </div>
  );
}
