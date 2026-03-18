import Image from "next/image";
import { Users, Lightbulb, Target, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 mt-8 pb-20">
      {/* HERO SECTION */}
      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-sm">
        <Image
          src="/featured.png" 
          alt="About TrendLama"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-4">
            Our Story
          </h1>
          <p className="max-w-2xl text-amber-50 text-base md:text-lg font-medium">
            Redefining modern e-commerce with a focus on quality, transparency, and a premium shopping experience.
          </p>
        </div>
      </div>

      {/* MISSION & VISION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-3xl font-bold text-gray-800">
              The TrendLama Mission
            </h2>
          </div>
          <p className="text-gray-500 leading-relaxed">
            Founded in 2025, TrendLama began with a simple idea: that high-quality, 
            premium products should be accessible to everyone through a seamless, 
            beautifully designed digital storefront. We started as a small team of 
            designers and developers who were tired of cluttered, slow e-commerce 
            experiences.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Today, we serve a global community of style-conscious individuals who 
            value both form and function. Every product on our site is curated to 
            ensure it meets our rigorous standards for quality and design.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3 items-center text-center">
            <Users className="w-8 h-8 text-gray-800" />
            <h3 className="font-bold text-gray-800 text-sm">Community Led</h3>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3 items-center text-center">
            <Lightbulb className="w-8 h-8 text-gray-800" />
            <h3 className="font-bold text-gray-800 text-sm">Innovation First</h3>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3 items-center text-center">
            <Target className="w-8 h-8 text-gray-800" />
            <h3 className="font-bold text-gray-800 text-sm">Design Driven</h3>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3 items-center text-center">
            <Heart className="w-8 h-8 text-gray-800" />
            <h3 className="font-bold text-gray-800 text-sm">Eco Conscious</h3>
          </div>
        </div>
      </div>

      {/* THE TEAM MOCK */}
      <div className="flex flex-col gap-8 mt-4">
        <div className="text-center flex flex-col gap-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Behind the Scenes
          </span>
          <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {[
            { name: "John Doe", role: "Founder & CEO" },
            { name: "Jane Smith", role: "Head of Design" },
            { name: "Michael Ross", role: "Creative Director" },
            { name: "Sarah Connor", role: "Lead Developer" },
          ].map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center gap-3 group">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-4xl font-black text-gray-400">
                  {member.name.charAt(0)}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{member.name}</h4>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
