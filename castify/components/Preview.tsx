"use client";

import { genresMap } from "@/utils/constants";
import { TPodcastPreview } from "@/utils/types";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  previewShow: TPodcastPreview;
}

export const Preview = ({ previewShow }: Props) => {
  const router = useRouter();
  const updatedDate = format(new Date(previewShow.updated), "PP");

  /**
   * List of genre titles associated with the show.
   *
   * Created by finding the genre objects in `genresMap` that have an id matching the ids in
   * the show's genres array.
   */
  const genreList = previewShow.genres.map((genreId) =>
    genresMap.find((genre) => genre.id === genreId)
  );

  return (
    <button
      onClick={() => router.push(`/show/${previewShow.id}`)}
      className="flex flex-col lg:gap-1 w-[7rem] md:w-[9rem] lg:w-[13rem] h-[14.5rem] md:h-[16rem] lg:h-[21rem] items-center justify-evenly rounded-lg shadow-md p-2 lg:p-3 hover:scale-95 transition"
    >
      <Image
        src={previewShow.image}
        alt="Podcast show image"
        priority
        height="0"
        width="0"
        sizes="100vw"
        className="w-full h-[6rem] md:h-[9rem] lg:h-[12rem] "
      />

      <h5 className="text-xs lg:text-base font-extrabold lg:font-bold text-center line-clamp-2">
        {previewShow.title}
      </h5>
      <small className="font-extrabold text-[0.65rem] lg:text-sm text-[#ff9671]">
        {previewShow.seasons} Seasons
      </small>
      <div className="flex items-center flex-wrap justify-center line-clamp-2">
        {genreList.map((genre, index) => (
          <p
            key={genre?.id}
            className="text-[0.6rem] lg:text-xs text-center font-semibold"
          >
            <Link
              href={`/explore?genre=${genre?.title}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[#4b4453] hover:text-blue-500 transition"
            >
              {genre?.title}
            </Link>
            {index !== genreList.length - 1 && <>,&nbsp;</>}
          </p>
        ))}
      </div>
      <p className="text-[0.6rem] lg:text-xs text-zinc-500 text-center">
        Updated: {updatedDate}
      </p>
    </button>
  );
};
