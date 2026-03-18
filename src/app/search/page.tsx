import ProductList from "@/components/ProductList";
import { Suspense } from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string; sort: string }>;
}) => {
  const { q, sort } = await searchParams;

  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-800">
          Search results for &quot;{q}&quot;
        </h1>
        <p className="text-sm text-gray-400">
          Showing matching products from all categories
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center text-gray-400">
            Searching for products...
          </div>
        }
      >
        <ProductList query={q} sort={sort} params="search" />
      </Suspense>
    </div>
  );
};

export default SearchPage;
