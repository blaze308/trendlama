import ProductList from "@/components/ProductList";
import Image from "next/image";
import { Suspense } from "react";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string; sort: string }>;
}) => {
  const { category, sort } = await searchParams;
  return (
    <div className="">
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured Product" fill className="object-cover rounded-lg" />
      </div>
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-gray-400">Loading products…</div>}>
        <ProductList category={category} params="homepage" sort={sort} />
      </Suspense>
    </div>
  );
};

export default Homepage;
