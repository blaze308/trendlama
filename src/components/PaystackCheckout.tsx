"use client";

import { useRouter } from "next/navigation";
import useCartStore from "@/stores/cartStore";
import { useState } from "react";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        onClose: () => void;
        callback: (response: { reference: string }) => void;
      }) => { openIframe: () => void };
    };
  }
}

const PaystackCheckout = ({
  total,
  email,
}: {
  total: number;
  email: string;
}) => {
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePaystack = () => {
    setLoading(true);
    setError("");

    const publicKey =
      process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder";

    // Load Paystack script dynamically
    const existingScript = document.getElementById("paystack-script");
    const initPaystack = () => {
      if (!window.PaystackPop) {
        setError("Paystack failed to load. Please try again.");
        setLoading(false);
        return;
      }
      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: email || "customer@example.com",
        amount: Math.round(total * 100),
        currency: "USD",
        ref: `trx_${Date.now()}`,
        onClose: () => setLoading(false),
        callback: async (response) => {
          // Verify payment server-side
          const res = await fetch("/api/checkout/paystack/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference }),
          });
          const data = await res.json();
          if (data.status === "success") {
            clearCart();
            router.push("/order-success");
          } else {
            setError("Payment verification failed.");
            setLoading(false);
          }
        },
      });
      handler.openIframe();
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "paystack-script";
      script.src = "https://js.paystack.co/v1/inline.js";
      script.onload = initPaystack;
      document.head.appendChild(script);
    } else {
      initPaystack();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        You&apos;ll be securely redirected to Paystack to complete your payment of{" "}
        <span className="font-semibold text-gray-800">${total.toFixed(2)}</span>.
      </p>
      {error && (
        <p className="text-xs text-red-500 bg-red-50 rounded px-3 py-2">
          {error}
        </p>
      )}
      <button
        onClick={handlePaystack}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 transition-all text-white p-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-medium text-sm disabled:opacity-60"
      >
        {loading ? "Loading Paystack…" : `Pay $${total.toFixed(2)} with Paystack`}
      </button>
    </div>
  );
};

export default PaystackCheckout;
