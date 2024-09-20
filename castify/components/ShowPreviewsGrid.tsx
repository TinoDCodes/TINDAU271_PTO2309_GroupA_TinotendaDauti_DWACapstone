import { TPodcastPreview } from "@/utils/types";
import { Preview } from "./Preview";
import { Skeleton } from "./ui/skeleton";

interface Props {
  showsToDisplay: TPodcastPreview[] | "loading";
}

export const ShowPreviewsGrid = ({ showsToDisplay }: Props) => {
  /* ---------- LOADING STATE DISPLAY ---------- */
  if (showsToDisplay === "loading") {
    return (
      <div className="wrapper w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 lg:gap-4">
        <Skeleton className="w-auto h-[10.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-auto h-[10.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-auto h-[10.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-auto h-[10.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-auto h-[10.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-auto h-[10.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-auto h-[10.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-auto h-[10.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="w-auto h-[10.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="hidden md:block w-auto h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="hidden md:block w-auto h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
        <Skeleton className="hidden md:block w-auto h-[11.5rem] md:h-[13rem] lg:h-[19rem]" />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 lg:gap-4">
      {showsToDisplay.map((show) => (
        <Preview key={show.id} previewShow={show} />
      ))}
    </div>
  );
};
