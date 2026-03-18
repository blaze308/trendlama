"use client";

import ProductCard from "@/components/ProductCard";
import useWishlistStore from "@/stores/wishlistStore";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

const WishlistPage = () => {
  const { wishlist, hasHydrated } = useWishlistStore();

  if (!hasHydrated) return null;

  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          My Wishlist <Heart className="w-6 h-6 text-red-500 fill-current" />
        </h1>
        <p className="text-sm text-gray-400">
          You have {wishlist.length} items saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <ShoppingBag className="w-12 h-12 stroke-1" />
          <div className="text-center">
            <p className="text-lg font-medium">Your wishlist is empty</p>
            <p className="text-sm mt-1">Start adding items you love!</p>
          </div>
          <Link
            href="/products"
            className="mt-2 bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
