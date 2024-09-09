"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const SearchInput = () => {
  const router = useRouter();
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  /**
   * Redirects the user to the search page with the search input value in the search params.
   *
   * @param {FormEvent} e - the form submit event object.
   */
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?title=${searchInputValue}`);
    setTimeout(() => setSearchInputValue(""), 800);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="wrapper flex items-center justify-center gap-0"
    >
      <Input
        id="search-input"
        name="search-input"
        type="search"
        placeholder="Search for shows..."
        value={searchInputValue}
        className="text-sm md:text-base h-8 md:h-10 p-4 max-w-[40rem] rounded-l-full border-r-0"
        onChange={(e) => setSearchInputValue(e.target.value)}
      />
      <Button
        size="icon"
        variant="ghost"
        type="submit"
        className="border h-[33px] md:h-10 border-l-0 rounded-l-none rounded-r-full w-fit"
      >
        <SearchIcon className="h-4 w-4 md:h-5 md:w-5 mx-4 text-[#0089ba]" />
      </Button>
    </form>
  );
};
