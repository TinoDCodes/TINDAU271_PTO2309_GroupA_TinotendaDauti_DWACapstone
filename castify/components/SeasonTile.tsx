import { TPodcastSeason } from "@/utils/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface Props {
  season: TPodcastSeason;
  onSeasonClick: () => void;
}

export const SeasonTile = ({ season, onSeasonClick }: Props) => {
  return (
    <button
      onClick={onSeasonClick}
      className="w-full flex items-center justify-between rounded-md gap-1 px-1 lg:px-6 lg:py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:scale-105 transition"
    >
      <article className="flex items-center gap-4">
        <Image
          src={season.image}
          alt="Season Cover image"
          height={80}
          width={80}
          sizes="(min-width: 1024px) 80px, (min-width: 768px) 64px, 48px"
          className="h-[4rem] lg:h-[5rem] w-[3rem] lg:w-[4rem] rounded-sm"
        />

        <div className="flex flex-col gap-1">
          <h4 className="text-[0.8rem] lg:text-base font-semibold text-left line-clamp-2">
            {season.title}
          </h4>
          <small className="text-xs lg:text-sm text-zinc-400 text-left">
            Season {season.season}
          </small>
        </div>
      </article>

      <div className="flex items-center gap-1 lg:gap-2">
        <p className="text-xs lg:text-sm text-zinc-500 text-nowrap">
          {season.episodes.length}{" "}
          {season.episodes.length > 1 ? "episodes" : "episode"}
        </p>
        <ChevronRight className="text-zinc-500 h-3 w-3" />
      </div>
    </button>
  );
};
