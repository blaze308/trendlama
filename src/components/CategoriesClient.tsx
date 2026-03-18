"use client";

import { DummyCategory } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CategoriesClient = ({ categories }: { categories: DummyCategory[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleChange = (slug: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (slug && slug !== "all") {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 text-sm">
      <button
        className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer text-xs font-medium ${
          !selectedCategory || selectedCategory === "all"
            ? "bg-gray-800 text-white border-gray-800"
            : "border-gray-200 text-gray-500 hover:border-gray-400"
        }`}
        onClick={() => handleChange("all")}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer text-xs font-medium ${
            selectedCategory === cat.slug
              ? "bg-gray-800 text-white border-gray-800"
              : "border-gray-200 text-gray-500 hover:border-gray-400"
          }`}
          onClick={() => handleChange(cat.slug)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoriesClient;
