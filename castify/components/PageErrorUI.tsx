import Image from "next/image";

interface Props {
  text: string;
}

export const PageErrorUI = ({ text }: Props) => {
  return (
    <div className="wrapper w-full h-full">
      <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <Image
          src="/icons/error-triangle.svg"
          alt="Error icon"
          height={112}
          width={112}
          sizes="(min-width: 1024px) 112px, 80px"
          className="h-20 w-20 lg:h-28 lg:w-28 opacity-25 dark:invert dark:opacity-75"
        />

        <strong className="text-sm lg:text-base text-center text-zinc-400 dark:text-zinc-200">
          {text}
        </strong>
      </article>
    </div>
  );
};
