import { DummyProduct } from "@/types";
import { Suspense } from "react";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import Link from "next/link";
import { getProducts, getProductsByCategory, getSortParams, searchProducts } from "@/lib/api";

const ProductList = async ({
  category,
  params,
  sort,
  query,
}: {
  category?: string;
  params: "homepage" | "products" | "search";
  sort?: string;
  query?: string;
}) => {
  const limit = params === "homepage" ? 12 : 24;
  const { sortBy, order } = getSortParams(sort);

  let products: DummyProduct[] = [];

  if (query) {
    products = await searchProducts(query, limit);
  } else if (category && category !== "all") {
    products = await getProductsByCategory(category, limit);
  } else {
    products = await getProducts(limit, sortBy, order);
  }

  return (
    <div className="w-full">
      {params !== "search" && (
        <Suspense fallback={<div className="h-10" />}>
          <Categories />
        </Suspense>
      )}
      {params !== "homepage" && <Filter />}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-1">
            {query
              ? `No results for "${query}"`
              : "Try a different category or filter"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {params === "homepage" && (
        <Link
          href={category ? `/products/?category=${category}` : "/products"}
          className="flex justify-end mt-6 underline text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          View all products →
        </Link>
      )}
    </div>
  );
};

export default ProductList;
