"use client";

import useCartStore from "@/stores/cartStore";
import { DummyProduct } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({ product }: { product: DummyProduct }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const handleQuantityChange = (type: "increment" | "decrement") => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${product.title} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    router.push("/cart");
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer border border-gray-300 p-1.5 rounded hover:bg-gray-100 transition-colors"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-medium w-6 text-center">{quantity}</span>
          <button
            className="cursor-pointer border border-gray-300 p-1.5 rounded hover:bg-gray-100 transition-colors"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-400 ml-2">
            {product.stock} available
          </span>
        </div>
      </div>
      {/* BUTTONS */}
      <button
        onClick={handleAddToCart}
        className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow flex items-center justify-center gap-2 cursor-pointer text-sm font-medium hover:bg-gray-900 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="ring-1 ring-gray-400 shadow text-gray-800 px-4 py-3 rounded-lg flex items-center justify-center cursor-pointer gap-2 text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        <ShoppingCart className="w-4 h-4" />
        Buy Now
      </button>
    </div>
  );
};

export default ProductInteraction;
