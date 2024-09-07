"use client";

import { Heart } from "lucide-react";
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

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="wrapper flex items-center justify-between shadow-lg">
      {/* ---------- APP LOGO ---------- */}
      <Link href="/">
        <Image
          src="/assets/castify-logo-light.png"
          alt="Castify logo"
          height="0"
          width="0"
          sizes="100vw"
          className="h-[1.9rem] w-[5.6rem] md:h-[2.5rem] md:w-[7.5rem] lg:h-[3.1rem] lg:w-[9.4rem]"
        />
      </Link>

      <Link
        href="/explore"
        className={`${
          pathname === "/explore" ? "text-[#845ec2]" : "text-zinc-500"
        } text-sm md:text-base lg:text-lg font-semibold hover:underline underline-offset-8`}
      >
        Explore <span className="hidden lg:inline">shows</span>
      </Link>

      {/* ---------- USER AUTH / FAVOURITES / SETTINGS ---------- */}
      <section className="flex items-center gap-3">
        {/* favourites */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
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

        {/* user avatar */}
        <Popover>
          <PopoverTrigger>
            <Image
              src="/icons/user-circle2.svg"
              alt="User avatar"
              height="0"
              width="0"
              sizes="100vw"
              className="h-6 w-6 md:h-8 md:w-8"
            />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit">
            <UserSettings />
          </PopoverContent>
        </Popover>
      </section>
    </header>
  );
};
