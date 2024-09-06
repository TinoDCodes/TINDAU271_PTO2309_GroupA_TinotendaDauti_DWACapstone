import { genresMap } from "@/utils/constants";
import { TPodcastPreview } from "@/utils/types";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  previewShow: TPodcastPreview;
}

export const Preview = ({ previewShow }: Props) => {
  const updatedDate = format(new Date(previewShow.updated), "PP");

  /**
   * Generates a comma-separated list of genre titles for the given show.
   *
   * It maps genre IDs from the show to their corresponding titles using `genresMap`
   * and combines them into a single string.
   */
  const genreList = previewShow.genres.reduce((acc, genreId) => {
    const genreTitle = genresMap.find((genre) => genre.id === genreId)?.title;
    return acc === "" ? `${genreTitle}` : `${acc}, ${genreTitle}`;
  }, "");

  return (
    <Link
      href="/"
      className="flex flex-col lg:gap-1 w-[7rem] md:w-[9rem] lg:w-[13rem] h-[14.5rem] md:h-[16rem] lg:h-[21rem] items-center justify-evenly rounded-lg shadow-md p-2 lg:p-3 hover:scale-95 hover:opacity-80"
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
      <p className="text-[0.6rem] lg:text-xs text-center font-medium line-clamp-2">
        {genreList}
      </p>
      <p className="text-[0.6rem] lg:text-xs text-zinc-500 text-center">
        Updated: {updatedDate}
      </p>
    </Link>
  );
};
