import { HeartIcon } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { PlayerState, usePlayerStore } from "@/store/podcastPlayer";

export const UserSettings = () => {
  const resetPlayerHistory = usePlayerStore(
    (state: PlayerState) => state.resetPlayerHistory
  );

  return (
    <div className="w-full flex flex-col gap-2 my-1">
      <Link
        href="/favourites"
        className="md:hidden flex items-center gap-2 text-sm text-zinc-600 py-1 px-2 rounded hover:bg-zinc-100 transition"
      >
        <HeartIcon color="#dc2626" fill="#dc2626" className="h-3 w-3" />{" "}
        Favourites
      </Link>

      {/* ---- RESET HISTORY ---- */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-sm lg:text-base text-left text-red-500 px-2 lg:px-4 py-1 lg:py-2 font-medium rounded-md hover:bg-zinc-100 hover:scale-95 transition">
            Reset history
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[22rem] rounded-lg md:w-[30rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action <strong>cannot be undone</strong>. This will
              permanently delete your listening history for all the episodes you
              have watched.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={resetPlayerHistory}
              className="bg-red-600 hover:bg-red-600 hover:opacity-80 transition"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
