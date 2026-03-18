"use client";

import useCartStore from "@/stores/cartStore";
import useWishlistStore from "@/stores/wishlistStore";
import { DummyProduct } from "@/types";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: DummyProduct }) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.title} added to cart`);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorited) {
      removeFromWishlist(product.id);
      toast.info(`Removed ${product.title} from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`Added ${product.title} to wishlist`);
    }
  };

  return (
    <div className="group shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative bg-white">
      {/* WISHLIST BUTTON */}
      <button
        onClick={toggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition-all duration-200 cursor-pointer ${
          isFavorited
            ? "bg-red-500 text-white"
            : "bg-white/80 text-gray-400 hover:text-red-500"
        }`}
      >
        <Heart
          className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`}
        />
      </button>

      {/* IMAGE */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.discountPercentage && product.discountPercentage > 5 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
      </Link>

      {/* DETAILS */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
            {product.brand || product.category}
          </p>
          <h3 className="font-medium text-sm leading-snug line-clamp-1 text-gray-800">
            {product.title}
          </h3>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs text-gray-500">{product.rating.toFixed(1)}</span>
          <span className="text-[10px] text-gray-300 ml-1">
            ({product.stock} left)
          </span>
        </div>

        {/* PRICE + CART */}
        <div className="flex items-center justify-between mt-1">
          <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-3 py-1.5 text-xs cursor-pointer hover:bg-gray-800 hover:text-white transition-all duration-200 flex items-center gap-1.5 font-medium"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
