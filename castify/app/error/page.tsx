import Image from "next/image";

export default function ErrorPage() {
  return (
    <div className="wrapper w-full h-full">
      <article className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <Image
          src="/icons/error-triangle.svg"
          alt="Error icon"
          height="0"
          width="0"
          sizes="100vw"
          className="h-20 w-20 lg:h-28 lg:w-28 opacity-25"
        />

        <strong className="text-sm lg:text-base text-center text-zinc-400">
          OOPS, something went wrong. Please try again or contact support if the
          problem persists.
        </strong>
      </article>
    </div>
  );
}
