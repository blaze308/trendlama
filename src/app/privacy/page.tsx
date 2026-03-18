export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Data Collection",
      content: "We collect information you provide directly, such as your name, email, and shipping address when you place an order or create an account."
    },
    {
      title: "2. Personal Information Use",
      content: "We use your information to process orders, communicate about products/services, and improve our website experience."
    },
    {
      title: "3. Data Sharing",
      content: "We do not sell your personal data. We share information only with trusted third parties (like Stripe/Paystack) necessary for order completion."
    },
    {
      title: "4. Security",
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse."
    },
    {
      title: "5. Your Rights",
      content: "You have the right to access, correct, or delete your personal information at any time. Simply contact our support team for any data-related requests."
    }
  ];

  return (
    <div className="mt-8 flex flex-col gap-10 pb-20 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2 border-b border-gray-100 pb-6">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Privacy & Security</span>
        <h1 className="text-4xl font-black text-gray-800 uppercase tracking-tight">Privacy Policy</h1>
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

      <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 mt-4 text-center">
        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">
          TrendLama is committed to your data security.
        </p>
      </div>
    </div>
  );
}
