import { type User } from "@supabase/supabase-js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CopyIcon, Share2Icon } from "lucide-react";
import { createShareableLink } from "@/utils/helpers";
import toast from "react-hot-toast";

interface Props {
  user?: User;
}

export const ShareFavouritesDialog = ({ user }: Props) => {
  const shareableFavouritesUrl = createShareableLink(user!.id);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableFavouritesUrl);

      toast.success("Copied!", {
        className: "dark:bg-black/85 dark:text-white/95",
      });
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to copy", {
        className: "dark:bg-black/85 dark:text-white/95",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center font-semibold text-zinc-600 dark:text-white/90 text-sm lg:text-base hover:bg-transparent hover:text-blue-500 dark:hover:text-blue-500 transition"
        >
          Share <Share2Icon className="ml-2 h-3 w-3 lg:h-4 lg:w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[22rem] sm:max-w-md rounded-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view to view your
            favourites list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={shareableFavouritesUrl} readOnly />
          </div>
          <Button
            size="sm"
            className="px-3 disabled:opacity-85"
            onClick={handleCopyToClipboard}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
