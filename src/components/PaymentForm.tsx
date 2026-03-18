"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const StripeCheckout = dynamic(() => import("./StripeCheckout"), { ssr: false });
const PaystackCheckout = dynamic(() => import("./PaystackCheckout"), { ssr: false });

const PaymentForm = ({
  total,
  email,
}: {
  total: number;
  email?: string;
}) => {
  const [tab, setTab] = useState<"stripe" | "paystack">("stripe");

  return (
    <div className="flex flex-col gap-6">
      {/* PAYMENT METHOD TABS */}
      <div>
        <p className="text-sm text-gray-500 mb-3 font-medium">Choose payment method</p>
        <div className="flex gap-2">
          <button
            className={`flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
              tab === "stripe"
                ? "bg-gray-800 text-white border-gray-800"
                : "border-gray-200 text-gray-500 hover:border-gray-400"
            }`}
            onClick={() => setTab("stripe")}
          >
            <span className="flex items-center justify-center gap-2">
              💳 Stripe / Card
            </span>
          </button>
          <button
            className={`flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
              tab === "paystack"
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-200 text-gray-500 hover:border-gray-400"
            }`}
            onClick={() => setTab("paystack")}
          >
            <span className="flex items-center justify-center gap-2">
              🟢 Paystack
            </span>
          </button>
        </div>
      </div>

      {/* ACCEPTED CARDS */}
      <div className="flex items-center gap-2 flex-wrap">
        {["Visa", "Mastercard", "Amex", "JCB"].map((card) => (
          <span
            key={card}
            className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-500"
          >
            {card}
          </span>
        ))}
        <span className="text-xs text-gray-400 ml-1">accepted via Stripe</span>
      </div>

      {/* PAYMENT FORM */}
      <div className="min-h-[200px]">
        {tab === "stripe" ? (
          <StripeCheckout total={total} />
        ) : (
          <PaystackCheckout total={total} email={email || "customer@example.com"} />
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
