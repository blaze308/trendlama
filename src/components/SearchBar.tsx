"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md bg-white"
    >
      <button type="submit" className="cursor-pointer">
        <Search className="w-4 h-4 text-gray-500 hover:text-gray-800 transition-colors" />
      </button>
      <input
        id="search"
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-sm outline-0 w-32 md:w-48 bg-transparent"
      />
    </form>
  );
};

export default SearchBar;