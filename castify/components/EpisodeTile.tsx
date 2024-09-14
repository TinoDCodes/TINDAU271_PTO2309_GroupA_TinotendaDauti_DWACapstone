import { TPodcastEpisode } from "@/utils/types";
import { Button } from "./ui/button";
import { Heart, PlayIcon, Volume2 } from "lucide-react";
import { PlayerState, usePlayerStore } from "@/store/podcastPlayer";
import { Slider } from "./ui/slider";
import { formatTimeStamp } from "@/utils/helpers";
import { User } from "@supabase/supabase-js";

interface Props {
  user?: User;
  identifier: string;
  episode: TPodcastEpisode;
  isFavourite: boolean;
  onPlayClick: () => void;
  onAddFavourites: () => void;
  onRemoveFavourites: () => void;
}

export const EpisodeTile = ({
  user,
  episode,
  identifier,
  isFavourite,
  onPlayClick,
  onAddFavourites,
  onRemoveFavourites,
}: Props) => {
  const { currentlyPlaying, playerHistory } = usePlayerStore(
    (state: PlayerState) => state
  );

  const episodeHistory = playerHistory.find(
    (item) => item.identifier === identifier
  );

  return (
    <div
      className={`${
        identifier === currentlyPlaying?.identifier
          ? "bg-zinc-200 dark:bg-zinc-800 opacity-70"
          : "bg-zinc-50 dark:bg-zinc-900/80"
      } w-full flex items-center rounded-lg shadow-md px-4 py-4`}
    >
      {/* ---- EPISODE NUMBER ---- */}
      <strong className="text-baes lg:text-lg text-[#ff8066]">
        {episode.episode}
      </strong>

      {/* ---- MIDDLE / EPISODE DETAILS SECTION ---- */}
      <article className="flex flex-col gap-1 text-left ml-4 lg:ml-7">
        <h4 className="font-bold text-sm lg:text-base max-w-[60vw] line-clamp-2">
          {episode.title}
        </h4>
        <p className="text-xs lg:text-sm text-zinc-500 dark:text-zinc-300 max-w-[55vw] md:max-w-[70vw] line-clamp-3 md:line-clamp-4 lg:line-clamp-none">
          {episode.description}
        </p>

        {/* ---- SECTION SHOWING EPISODE'S PLAY HISTORY ---- */}
        {episodeHistory && (
          <div className="mt-2 flex flex-col gap-1">
            <small className="font-raleway text-zinc-400">
              {episodeHistory.wasPlayedFully ? "Finished" : "Progress"}
            </small>
            <Slider
              variant="blue-no-thumb"
              disabled
              value={
                episodeHistory.wasPlayedFully
                  ? [episodeHistory.episodeLength!]
                  : [episodeHistory.progress!]
              }
              max={episodeHistory.episodeLength}
              className="h-1 opacity-60"
            />
            {!episodeHistory.wasPlayedFully && (
              <small className="text-zinc-400 font-medium text-xs lg:text-sm">
                {formatTimeStamp(episodeHistory.progress!)}
              </small>
            )}
          </div>
        )}
      </article>

      {/* ---- CONTROLS SECTION ---- */}
      <section className="ml-auto flex flex-col md:flex-row items-center gap-3">
        {/* ---- FAVOURITES BUTTON ---- */}
        {user && (
          <>
            {isFavourite ? (
              <button onClick={onRemoveFavourites}>
                <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-red-500 fill-red-500 hover:opacity-85 transition" />
              </button>
            ) : (
              <button onClick={onAddFavourites}>
                <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-zinc-400 hover:text-red-500 hover:fill-red-500 transition" />
              </button>
            )}
          </>
        )}

        {/* ---- PLAY BUTTON ---- */}
        {identifier === currentlyPlaying?.identifier ? (
          <Volume2 className="text-[#ff6f91] h-5 w-5 lg:h-6 lg:w-6" />
        ) : (
          <Button
            size="lg"
            variant="ghost"
            className="p-0 hover:bg-transparent"
            onClick={onPlayClick}
          >
            <PlayIcon
              strokeWidth={2}
              className="h-5 w-5 lg:h-6 lg:w-6 text-zinc-400 hover:text-green-500 hover:fill-green-500 transition"
            />
          </Button>
        )}
      </section>
    </div>
  );
};
