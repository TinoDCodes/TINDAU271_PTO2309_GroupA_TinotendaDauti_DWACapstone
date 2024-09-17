import { DbUserFavourite } from "@/utils/types";
import { Badge } from "./ui/badge";
import { formatDate } from "date-fns";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { PlayerState, usePlayerStore } from "@/store/podcastPlayer";
import { createEpisodeIdentifier } from "@/utils/helpers";

interface Props {
  favourite: DbUserFavourite;
  removeFavourite: () => void;
}

export const FavouriteEpisodeTile = ({ favourite, removeFavourite }: Props) => {
  const { currentlyPlaying, setCurrentlyPlaying } = usePlayerStore(
    (state: PlayerState) => state
  );

  const episodeIdentifier = createEpisodeIdentifier(
    favourite.show_id.toString(),
    favourite.season_id.toString(),
    favourite.episode_id
  );

  /**
   * Handles the play button click event and sets the currently playing episode.
   *
   * @returns {void} - No return value.
   */
  const handleClickPlay = () => {
    setCurrentlyPlaying({
      identifier: episodeIdentifier,
      episode: favourite.episode_id,
      title: favourite.episode_title,
      description: favourite.episode_description,
      file: favourite.episode_file,
    });
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 p-4 lg:px-6 shadow-md dark:bg-zinc-900/90 rounded-md">
      <section className="flex flex-col gap-1 md:col-span-4">
        <h5 className="text-xs lg:text-sm font-extrabold">
          {favourite.episode_title}
        </h5>

        <h3 className="text-sm lg:text-base font-semibold mt-2">
          {favourite.show_title}
        </h3>
        <Badge className="w-fit bg-[#b0a8b9] dark:bg-[#4b4453] dark:text-white">
          Season {favourite.season_id}
        </Badge>

        <p className="mt-2 text-xs lg:text-sm text-zinc-600 dark:text-zinc-200 line-clamp-3">
          {favourite.episode_description || "(no description)"}
        </p>
        <small className="text-xs text-zinc-400 font-medium">
          Show updated: {formatDate(new Date(favourite.show_updated), "PP")}
        </small>
        <small className="text-xs text-zinc-400 font-medium">
          Added: {formatDate(new Date(favourite.created_at), "PPp")}
        </small>
      </section>

      <section className="flex flex-col gap-3 md:justify-center md:items-end mt-3 lg:mt-0">
        <Button
          onClick={handleClickPlay}
          disabled={currentlyPlaying?.identifier === episodeIdentifier}
          className="flex items-center h-7 w-20 text-white bg-green-600 hover:bg-green-500 hover:scale-95 font-bold transition disabled:opacity-75"
        >
          Play <Play className="h-3 w-3 ml-2 text-white fill-white" />
        </Button>

        <Button
          onClick={removeFavourite}
          variant="link"
          className="text-red-500 w-fit md:w-20 h-7 p-0"
        >
          Remove
        </Button>
      </section>
    </div>
  );
};
