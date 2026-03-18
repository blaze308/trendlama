"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const current = searchParams.get("sort") || "";

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 my-6">
      <span>Sort by:</span>
      <select
        name="sort"
        id="sort"
        value={current}
        className="ring-1 ring-gray-200 shadow p-1.5 rounded-md text-sm cursor-pointer"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="">Default</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
};

export default Filter;
