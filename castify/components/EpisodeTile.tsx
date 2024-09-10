import { TPodcastEpisode } from "@/utils/types";
import { Button } from "./ui/button";
import { PlayIcon, Volume2 } from "lucide-react";
import { PlayerState, usePlayerStore } from "@/store/podcastPlayer";

interface Props {
  identifier: string;
  episode: TPodcastEpisode;
  onPlayClick: () => void;
}

export const EpisodeTile = ({ episode, identifier, onPlayClick }: Props) => {
  const { currentlyPlaying } = usePlayerStore((state: PlayerState) => state);

  return (
    <div
      className={`${
        identifier === currentlyPlaying?.identifier
          ? "bg-zinc-200 opacity-70"
          : "bg-zinc-50"
      } w-full flex items-center rounded-lg shadow-md px-4 py-4`}
    >
      <strong className="text-baes lg:text-lg text-[#ff8066]">
        {episode.episode}
      </strong>

      <article className="flex flex-col gap-1 text-left ml-4 lg:ml-7">
        <h4 className="font-bold text-sm lg:text-base max-w-[60vw]">
          {episode.title}
        </h4>
        <p className="text-xs lg:text-sm text-zinc-500 max-w-[55vw] md:max-w-[70vw] line-clamp-3 md:line-clamp-4 lg:line-clamp-none">
          {episode.description}
        </p>
      </article>

      <section className="ml-auto">
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
