"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/cartStore";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

const CheckoutForm = ({ total }: { total: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      setError(submitErr.message || "Submission failed");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const { clientSecret, error: apiError } = await res.json();

      if (apiError) {
        setError(apiError);
        setLoading(false);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },
      });

      if (confirmError) {
        setError(confirmError.message || "Payment failed");
      } else {
        clearCart();
        router.push("/order-success");
      }
    } catch {
      setError("An unexpected error occurred.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      {error && (
        <p className="text-xs text-red-500 bg-red-50 rounded px-3 py-2">
          {error}
        </p>
      )}
      <p className="text-xs text-gray-400">
        Test card: <span className="font-mono font-medium text-gray-600">4242 4242 4242 4242</span> · Any future date · Any CVV
      </p>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gray-800 hover:bg-gray-900 transition-all text-white p-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 font-medium text-sm disabled:opacity-60"
      >
        {loading ? "Processing…" : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

const StripeCheckout = ({ total }: { total: number }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/checkout/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.clientSecret) setClientSecret(d.clientSecret);
      })
      .catch(() => {});
  }, [total]);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-8 text-gray-400 text-sm">
        Loading payment form…
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm total={total} />
    </Elements>
  );
};

export default StripeCheckout;
