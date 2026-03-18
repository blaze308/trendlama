import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();

    if (!process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_SECRET_KEY === "sk_test_...") {
      // No real key — simulate success for demo/dev
      return NextResponse.json({ status: "success", reference });
    }

    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const data = await res.json();

    if (data.data?.status === "success") {
      return NextResponse.json({ status: "success", reference });
    }
    return NextResponse.json({ status: "failed" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
