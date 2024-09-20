"use client";

import { Hero } from "@/components/Hero";
import { HomeShowsCarousel } from "@/components/HomeShowsCarousel";
import { PageErrorUI } from "@/components/PageErrorUI";
import { TPodcastPreview } from "@/utils/types";
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
      <PageErrorUI text="Sorry, we couldn't load the podcasts. Please try again or contact support if the problem persists." />
    );
  }

  return (
    <div className="wrapper">
      <Hero />

      {/* ---------- SHOWS USER MIGHT LIKE ---------- */}
      <section className="my-4 lg:my-8">
        <h2 className="text-sm lg:text-base font-bold font-raleway">
          👍 You might like these...
        </h2>
        <HomeShowsCarousel shows={shows} section="might-like" />
      </section>

      {/* ---------- RECENTLY AIRED SHOWS ---------- */}
      <section className="my-2 lg:my-4">
        <h2 className="text-sm lg:text-base font-bold font-raleway">
          Recently aired podcasts
        </h2>
        <HomeShowsCarousel shows={shows} section="most-recent" />
      </section>
    </div>
  );
}
