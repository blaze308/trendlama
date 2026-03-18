"use client";

import useCartStore from "@/stores/cartStore";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-6 max-w-md">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Confirmed!</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Thank you for your purchase. We&apos;ve received your order and will
            send you a confirmation email shortly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full">
          <Link
            href="/products"
            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg text-sm font-medium text-center transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg text-sm font-medium text-center transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
