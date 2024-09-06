"use client";

import { Hero } from "@/components/Hero";
import { HomeShowsCarousel } from "@/components/HomeShowsCarousel";
import { TPodcastPreview } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [shows, setShows] = useState<TPodcastPreview[] | "error">([]);

  useEffect(() => {
    const getPreviews = async () => {
      const previews = await fetch("https://podcast-api.netlify.app/shows")
        .then((res) => res.json())
        .catch((error) => "error");

      setShows(previews);
    };

    getPreviews();
  }, []);

  // TODO: implement error display
  if (shows === "error") {
    return <div>An unexpected error occured</div>;
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
