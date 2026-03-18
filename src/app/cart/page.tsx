"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cartStore";
import { ShippingFormInputs } from "@/types";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment" },
];

const SHIPPING_FEE = 10;
const DISCOUNT_RATE = 0.1;

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get("step") || "1");
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * DISCOUNT_RATE;
  const total = subtotal - discount + SHIPPING_FEE;

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-gray-800">Your Shopping Cart</h1>

      {/* STEPS */}
      <div className="flex items-center gap-4 lg:gap-12">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-semibold ${
                  step.id === activeStep
                    ? "bg-gray-800"
                    : step.id < activeStep
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                {step.id < activeStep ? "✓" : step.id}
              </div>
              <p
                className={`text-sm font-medium hidden sm:block ${
                  step.id === activeStep ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.title}
              </p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-gray-300 mx-2" />
            )}
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/* LEFT — STEP CONTENT */}
        <div className="w-full lg:w-7/12 shadow-sm border border-gray-100 p-8 rounded-xl flex flex-col gap-6">
          {activeStep === 1 ? (
            cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-gray-400">
                <ShoppingBag className="w-12 h-12" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <Link
                  href="/products"
                  className="text-sm text-gray-800 underline hover:text-gray-600 transition-colors"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    className="flex items-center justify-between gap-4"
                    key={item.id}
                  >
                    {/* IMAGE AND DETAILS */}
                    <div className="flex gap-4 flex-1">
                      <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                        </div>
                        {/* QTY */}
                        <div className="flex items-center gap-2">
                          <button
                            className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-xs hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                          >
                            −
                          </button>
                          <span className="text-sm w-5 text-center">{item.quantity}</span>
                          <button
                            className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-xs hover:bg-gray-100 cursor-pointer"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="font-semibold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {/* DELETE */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 transition-colors text-red-400 flex items-center justify-center cursor-pointer flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </>
            )
          ) : activeStep === 2 ? (
            <ShippingForm setShippingForm={setShippingForm} />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm total={total} email={shippingForm.email} />
          ) : (
            <p className="text-sm text-gray-500 py-8 text-center">
              Please complete the shipping step first.
            </p>
          )}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="w-full lg:w-5/12 shadow-sm border border-gray-100 p-8 rounded-xl flex flex-col gap-6 h-max">
          <h2 className="font-semibold text-gray-800">Order Summary</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal ({cart.length} items)</p>
              <p className="font-medium">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount (10%)</p>
              <p className="font-medium text-green-600">−${discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping</p>
              <p className="font-medium">${SHIPPING_FEE.toFixed(2)}</p>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between font-semibold text-gray-800">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          {activeStep === 1 && cart.length > 0 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-colors text-white p-3 rounded-lg cursor-pointer flex items-center justify-center gap-2 text-sm font-medium"
            >
              Continue to Shipping
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <Link
            href="/products"
            className="text-center text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
