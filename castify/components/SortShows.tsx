"use client";

import { TSortOption } from "@/utils/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const sortOptions: TSortOption[] = [
  { value: "default", title: "-- Default --" },
  { value: "titleAsc", title: "title A-Z" },
  { value: "titleDesc", title: "title Z-A" },
  { value: "dateDesc", title: "most recent" },
  { value: "dateAsc", title: "oldest" },
];

export const SortShows = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [sortValue, setSortValue] = useState<TSortOption>(sortOptions[0]);

  /**
   * Initializes the sort value based on the URL search parameters.
   *
   * If the "sort" parameter exists, it finds and sets the corresponding sort option.
   */
  useEffect(() => {
    if (searchParams.has("sort")) {
      const sortOptionfromParams = sortOptions.find(
        (option) => option.value === searchParams.get("sort")
      );
      setSortValue(sortOptionfromParams!);
    } else {
      setSortValue(sortOptions[0]);
    }
  }, [searchParams]);

  /**
   * Updates the URL search parameters when the sort value changes.
   *
   * If the sort value is "default", it removes the "sort" parameter from the URL.
   * Otherwise, it updates the "sort" parameter and pushes the new URL.
   */
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (sortValue.value === "default") {
      newParams.delete("sort");
    } else {
      newParams.set("sort", sortValue.value);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }, [sortValue, pathname, router, searchParams]);

  return (
    <div className="ml-auto flex items-center gap-2">
      <small className="text-sm lg:text-base text-zinc-500 dark:text-zinc-300 font-medium">
        sort:
      </small>
      <select
        name="sort-select"
        id="sort-select"
        className="py-1 border-[1px] rounded-sm text-xs lg:text-sm px-1 mr-2 md:mr-4"
        onChange={(e) =>
          setSortValue(
            sortOptions.find((option) => option.value === e.target.value)!
          )
        }
        value={sortValue.value}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};
