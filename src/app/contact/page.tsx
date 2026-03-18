"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="mt-8 flex flex-col gap-12 pb-20">
      <div className="text-center flex flex-col gap-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
          Get in Touch
        </span>
        <h1 className="text-4xl font-black text-gray-800 uppercase tracking-tight">
          Contact Us
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Have a question about a product, shipping, or an existing order? 
          Our team is here to help you 24/7.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* CONTACT INFO */}
        <div className="w-full lg:w-4/12 flex flex-col gap-6">
          {[
            { icon: Mail, label: "Email Us", value: "support@trendlama.com", sub: "Response within 24 hours" },
            { icon: Phone, label: "Call Us", value: "+1 (555) 000-0000", sub: "Mon-Fri, 9am - 5pm EST" },
            { icon: MapPin, label: "Visit Us", value: "123 Style Ave, Fashion City", sub: "San Francisco, CA 94103" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-3 bg-gray-50 rounded-xl text-gray-800">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                <span className="text-base font-bold text-gray-800">{item.value}</span>
                <span className="text-xs text-gray-400">{item.sub}</span>
              </div>
            </div>
          ))}

          {/* SOCIAL MOCK */}
          <div className="p-6 rounded-2xl bg-gray-800 text-white flex flex-col gap-4">
            <h3 className="font-bold text-sm tracking-widest uppercase">Follow Us</h3>
            <div className="flex gap-4">
              {['Ig', 'Tw', 'Fb', 'Yt'].map(soc => (
                <div key={soc} className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-[10px] font-bold hover:bg-white hover:text-gray-800 transition-all cursor-pointer">
                  {soc}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="w-full lg:w-8/12 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-gray-800 transition-all text-sm"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="Your Email"
                  className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-gray-800 transition-all text-sm"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Subject</label>
              <input 
                type="text" 
                required
                placeholder="How can we help?"
                className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-gray-800 transition-all text-sm"
                value={form.subject}
                onChange={e => setForm({...form, subject: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Message</label>
              <textarea 
                rows={6}
                required
                placeholder="Type your message here..."
                className="p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-gray-800 transition-all text-sm resize-none"
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
              />
            </div>
            <button 
              type="submit"
              disabled={submitting}
              className="w-full md:w-max px-12 py-3 bg-gray-800 text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
