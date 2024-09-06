import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const Hero = () => {
  return (
    <article className="w-full flex items-center justify-between bg-violet-50 shadow-md rounded-lg pl-4 pr-0 md:px-8 lg:pr-5 xl:px-16">
      <section className="flex flex-col py-3 md:py-0">
        <h1 className="text-xs md:text-xl lg:text-4xl xl:text-5xl font-bold raleway-font mb-2 lg:mb-4">
          Listen To Your Favourite Podcasts
        </h1>
        <p className="text-[0.6rem] md:text-sm lg:text-lg">
          Discover new shows, stay updated with your favorites, and never miss
          an episode.
        </p>

        <Button
          asChild
          className="rounded-full mt-3 md:mt-5 lg:mt-10 w-fit px-2 md:px-4 lg:px-6 lg:py-6 text-[0.6rem] md:text-sm lg:text-lg font-semibold bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)]"
        >
          <Link href="/explore">
            Explore shows{" "}
            <ChevronRight
              strokeWidth={4}
              className="h-2 w-2 md:h-4 md:w-4 ml-1 md:ml-4"
            />
          </Link>
        </Button>
      </section>

      <Image
        src="/assets/hero-image.png"
        alt="Hero image"
        height="0"
        width="0"
        sizes="100vw"
        className="h-[7.5rem] w-[9.375rem] md:h-[12.5rem] md:w-[18.75rem] lg:h-[18.75rem] lg:w-[28.125rem]"
      />
    </article>
  );
};
