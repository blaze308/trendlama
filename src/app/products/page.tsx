import ProductList from "@/components/ProductList";
import { Suspense } from "react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort: string }>;
}) => {
  const { category, sort } = await searchParams;
  return (
    <div className="">
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-gray-400">Loading products…</div>}>
        <ProductList category={category} params="products" sort={sort} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
