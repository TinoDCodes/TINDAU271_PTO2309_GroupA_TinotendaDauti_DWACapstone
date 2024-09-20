import { HeartIcon, MoonStarIcon } from "lucide-react";
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
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

export const UserSettings = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { playerHistory, resetPlayerHistory } = usePlayerStore(
    (state: PlayerState) => state
  );

  const handleThemeChange = (checked: boolean) => {
    if (checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleResetPlayerHistory = () => {
    resetPlayerHistory();
    toast.success("Cleared audio player history", {
      className: "dark:bg-black/80 dark:text-white/95",
      icon: "🧹",
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 my-1">
      <Link
        href="/favourites"
        className="md:hidden flex items-center gap-2 text-sm text-zinc-600 dark:text-white/90 py-1 px-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
      >
        <HeartIcon color="#dc2626" fill="#dc2626" className="h-3 w-3" />{" "}
        Favourites
      </Link>

      <section className="flex items-center justify-between px-2 lg:px-4 min-w-44 lg:min-w-56">
        <p className="text-sm lg:text-base text-zinc-500 dark:text-white/90 font-medium flex items-center gap-2">
          <MoonStarIcon className="text-zinc-500 dark:text-white/90 h-4 w-4" />
          Dark mode
        </p>

        <Switch
          checked={resolvedTheme === "dark"}
          onCheckedChange={handleThemeChange}
        />
      </section>

      {/* ---- RESET HISTORY ---- */}
      <AlertDialog>
        <AlertDialogTrigger
          disabled={!playerHistory || playerHistory.length === 0}
          asChild
        >
          <button className="text-sm lg:text-base text-left text-red-500 px-2 lg:px-4 py-1 lg:py-2 font-medium rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:scale-95 transition disabled:text-zinc-400 disabled:hover:scale-100 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
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
              onClick={handleResetPlayerHistory}
              className="bg-red-600 hover:bg-red-600 hover:opacity-80 transition dark:font-medium"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
