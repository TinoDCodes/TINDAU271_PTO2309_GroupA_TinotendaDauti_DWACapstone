"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TPodcastShow } from "@/utils/types";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  params: { showId: string };
}

export default function ShowPage({ params }: Props) {
  const [show, setShow] = useState<TPodcastShow | "loading" | "error">(
    "loading"
  );

  useEffect(() => {
    const getShow = async () => {
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${params.showId}`
      )
        .then((res) => res.json())
        .catch((error) => "error");

      setShow(response);
    };

    getShow();
  }, []);

  // TODO: design loading state view
  /* ---------- LOADING STATE DISPLAY ---------- */
  if (show === "loading") {
    return <div className="wrapper">loading...</div>;
  }

  // TODO: design error state view
  /* ---------- ERROR STATE DISPLAY ---------- */
  if (show === "error") {
    return <div className="wrapper">OOPS, something went wrong!</div>;
  }

  return (
    <div className="wrapper grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* ---- LHS or TOP section depending on display size ---- */}
      <section className="w-full md:h-full flex flex-col gap-2 lg:gap-4 items-center bg-muted pb-4 md:py-6 lg:py-8 rounded-t-lg md:rounded-r-none  md:rounded-l-lg">
        <Image
          src={show.image}
          alt="Show Cover Image"
          height="0"
          width="0"
          sizes="100vw"
          className="h-[20rem] w-full md:w-[19rem] rounded-t-lg rounded-b-none md:rounded-lg"
        />

        <h2 className="text-xl lg:text-2xl text-center font-bold font-raleway">
          {show.title}
        </h2>

        <p className="text-[0.6rem] lg:text-xs text-center max-w-72 lg:max-w-[24rem] xl:max-w-[30rem] line-clamp-6">
          {show.description}
        </p>

        {/* genres */}
        <small className="text-xs lg:text-sm text-[#845ec2]">
          <span className="font-semibold text-black">genres:&nbsp;&nbsp;</span>
          {show.genres && show.genres.join(", ")}
        </small>

        <small className="text-xs lg:text-sm text-zinc-500">
          updated: {format(new Date(show.updated), "PP")}
        </small>
      </section>

      {/* ---- RHS or BOTTOM section depending on display size ---- */}
      <ScrollArea className="w-full h-full max-h-[40rem]">
        <div className="p-4">
          {show.seasons.map((season) => (
            <>
              <h3 key={season.season}>season {season.season}</h3>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
