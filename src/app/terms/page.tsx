export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using TrendLama, you agree to be bound by these Terms of Service and all applicable laws and regulations."
    },
    {
      title: "2. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account and password. TrendLama reserves the right to refuse service or terminate accounts at its sole discretion."
    },
    {
      title: "3. Product Information",
      content: "We attempt to be as accurate as possible with product descriptions and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free."
    },
    {
      title: "4. Payments & Billing",
      content: "All payments are processed securely through our partners (Stripe/Paystack). By providing a payment method, you represent that you are authorized to use that method."
    },
    {
      title: "5. Shipping & Delivery",
      content: "Delivery times are estimates and not guaranteed. TrendLama is not liable for delays caused by shipping carriers or customs."
    }
  ];

  return (
    <div className="mt-8 flex flex-col gap-10 pb-20 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2 border-b border-gray-100 pb-6">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Legal Information</span>
        <h1 className="text-4xl font-black text-gray-800 uppercase tracking-tight">Terms of Service</h1>
        <p className="text-gray-400 text-sm italic">Last updated: October 2025</p>
      </div>

      <div className="flex flex-col gap-8">
        {sections.map((sec) => (
          <div key={sec.title} className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">{sec.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{sec.content}</p>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 mt-4">
        <p className="text-xs text-gray-400 text-center uppercase font-bold tracking-widest">
          Questions? Contact us at support@trendlama.com
        </p>
      </div>
    </div>
  );
}
