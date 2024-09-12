"use client";

import { ChevronRight, Heart, LogOut, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { UserSettings } from "./UserSettings";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { Separator } from "./ui/separator";
import { useTheme } from "next-themes";

interface Props {
  userData: {
    user: User | null;
  };
}

export const Header = ({ userData }: Props) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  /**
   *  Handles user sign out using supabase (client side) client.
   */
  const handleSignOut = () => {
    const supabase = createClient();

    supabase.auth
      .signOut()
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };

  return (
    <header className="wrapper flex items-center justify-between shadow-lg dark:shadow-zinc-50/5">
      {/* ---------- APP LOGO ---------- */}
      <Link href="/">
        <Image
          src={
            theme === "light"
              ? "/assets/castify-logo-light.png"
              : "/assets/castify-logo-dark.png"
          }
          alt="Castify logo"
          height="0"
          width="0"
          sizes="100vw"
          className="h-[1.9rem] w-[5.6rem] md:h-[2.5rem] md:w-[7.5rem] lg:h-[3.1rem] lg:w-[9.4rem]"
          priority
        />
      </Link>

      <Link
        href="/explore"
        className={`${
          pathname === "/explore"
            ? "text-[#845ec2]"
            : "text-zinc-500 dark:text-zinc-200/90"
        } text-sm md:text-base lg:text-lg font-semibold hover:underline underline-offset-8 transition`}
      >
        Explore <span className="hidden lg:inline">shows</span>
      </Link>

      {/* ---------- USER AUTH / FAVOURITES / SETTINGS ---------- */}
      <section className="flex items-center gap-3">
        {/* favourites */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="hidden md:inline">
              <Link href="/favourites">
                <Heart
                  color="#dc2626"
                  fill="#dc2626"
                  className="h-5 w-5 md:h-7 md:w-7"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Favourites</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* user settings popover */}
        <Popover>
          <PopoverTrigger className="flex items-center gap-1">
            {userData.user ? (
              <Image
                src="/icons/user-circle2.svg"
                alt="User avatar"
                height="0"
                width="0"
                sizes="100vw"
                className="h-6 w-6 md:h-8 md:w-8"
              />
            ) : (
              <Image
                src="/icons/user-rounded.svg"
                alt="User avatar"
                height="0"
                width="0"
                sizes="100vw"
                className="h-6 w-6 md:h-8 md:w-8"
              />
            )}
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit min-w-36 lg:min-w-48">
            {userData.user && (
              <div className="flex items-center px-2 lg:px-4 gap-2 mb-5 opacity-65 text-[#4b4453] dark:text-white text-xs md:text-sm lg:text-base">
                <User2Icon className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
                <span className="max-w-36 overflow-clip text-ellipsis ">
                  {userData.user.email}
                </span>
              </div>
            )}

            <UserSettings />

            <Separator />

            {/* Log In button */}
            {!userData.user && (
              <Button
                asChild
                variant="ghost"
                className="mt-4 w-full bg-[#b0a8b944] hover:scale-95 h-fit"
              >
                <Link href="/login" className="text-xs md:text-sm lg:text-base">
                  Log In <ChevronRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>
            )}

            {/* Sign out button */}
            {userData.user && (
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="mt-4 w-full bg-[#b0a8b944] hover:scale-95 h-fit text-xs md:text-sm lg:text-base"
              >
                Sign Out <LogOut className="h-3 w-3 lg:h-4 lg:w-4 ml-auto" />
              </Button>
            )}
          </PopoverContent>
        </Popover>
      </section>
    </header>
  );
};
