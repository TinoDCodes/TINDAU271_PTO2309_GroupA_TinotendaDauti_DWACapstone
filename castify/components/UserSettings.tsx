import { HeartIcon } from "lucide-react";
import Link from "next/link";

export const UserSettings = () => {
  return (
    <div className="w-full flex flex-col gap-2 my-1">
      <Link
        href="/favourites"
        className="md:hidden flex items-center gap-2 text-sm p-2 rounded hover:bg-zinc-100 transition"
      >
        <HeartIcon color="#dc2626" fill="#dc2626" className="h-4 w-4" />{" "}
        Favourites
      </Link>
    </div>
  );
};
