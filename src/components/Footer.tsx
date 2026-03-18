import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gray-900 pt-16 pb-8 px-8 md:px-12 rounded-t-[3rem]">
      <div className="w-full flex flex-col gap-16">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          {/* BRAND */}
          <div className="flex flex-col gap-6 max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="TrendLama" width={40} height={40} className="brightness-200" />
              <p className="text-lg font-black tracking-[0.2em] text-white uppercase">
                TrendLama.
              </p>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your premier destination for high-quality, modern, and designer products. 
              Elevate your lifestyle with our curated collections.
            </p>
            <div className="flex gap-4">
              {['fb', 'tw', 'ig', 'yt'].map(soc => (
                <div key={soc} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase hover:bg-white hover:text-black transition-all cursor-pointer">
                  {soc}
                </div>
              ))}
            </div>
          </div>

          {/* LINKS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 lg:max-w-2xl">
            {/* SHOP */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest bg-amber-600/20 text-amber-500 w-max px-2 py-1 rounded">Shop</h4>
              <nav className="flex flex-col gap-3 text-sm text-gray-400">
                <Link href="/products" className="hover:text-white transition-colors">All Products</Link>
                <Link href="/products?sort=rating" className="hover:text-white transition-colors">Best Sellers</Link>
                <Link href="/products?sort=desc" className="hover:text-white transition-colors">New Arrivals</Link>
                <Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
              </nav>
            </div>

            {/* COMPANY */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest bg-gray-800 text-gray-400 w-max px-2 py-1 rounded">Company</h4>
              <nav className="flex flex-col gap-3 text-sm text-gray-400">
                <Link href="/about" className="hover:text-white transition-colors">Our Story</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                <Link href="/profile" className="hover:text-white transition-colors">My Account</Link>
                <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
              </nav>
            </div>

            {/* LEGAL */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest bg-gray-800 text-gray-400 w-max px-2 py-1 rounded">Legal</h4>
              <nav className="flex flex-col gap-3 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Returns & Shipping</Link>
                <Link href="/about" className="hover:text-white transition-colors">Sustainability</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-800 text-xs text-gray-500 font-medium">
          <p>© 2025 TrendLama. Built for modern shopping.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Secure Payments Active
            </span>
            <div className="flex items-center gap-2 grayscale brightness-200 opacity-30">
              <Image src="/klarna.png" alt="klarna" width={30} height={15} />
              <Image src="/cards.png" alt="cards" width={30} height={15} />
              <Image src="/stripe.png" alt="stripe" width={30} height={15} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
