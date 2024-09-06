import { TPodcastPreview } from "@/utils/types";
import { Preview } from "./Preview";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface Props {
  shows: TPodcastPreview[];
}

export const ShowsUserMightLike = ({ shows }: Props) => {
  const testShows = shows.slice(0, 10);

  return (
    <Carousel className="lg:mt-1 w-full">
      <CarouselContent className="lg:pl-4">
        {testShows.map((show) => (
          <CarouselItem
            key={show.id}
            className="basis-1/3 md:basis-[22%] lg:basis-1/5 xl:basis-1/6 pb-2"
          >
            <Preview previewShow={show} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:block" />
      <CarouselNext className="hidden lg:block" />
    </Carousel>
  );
};
