"use client";

import useWishlistStore from "@/stores/wishlistStore";
import { Heart } from "lucide-react";
import Link from "next/link";

const WishlistIcon = () => {
  const { wishlist, hasHydrated } = useWishlistStore();

  if (!hasHydrated) return null;

  return (
    <Link href="/wishlist" className="relative group">
      <Heart className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
      {wishlist.length > 0 && (
        <span className="absolute -top-2.5 -right-2.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shadow-sm">
          {wishlist.length}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;
