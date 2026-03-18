import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Home } from "lucide-react";
import ShoppingCartIcon from "@/components/ShoppingCartIcon";
import WishlistIcon from "@/components/WishlistIcon";
import { auth, signOut } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pt-8 pb-6 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      {/* LEFT */}
      <Link href="/" className="flex items-center gap-2 group">
        <Image
          src="/logo.png"
          alt="TrendLama"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9 group-hover:rotate-12 transition-transform duration-300"
        />
        <p className="hidden md:block text-sm font-bold tracking-[0.2em] text-gray-800">
          TRENDLAMA.
        </p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-4 md:gap-6">
        <SearchBar />
        <Link href="/" className="hidden sm:block">
          <Home className="w-4 h-4 text-gray-500 hover:text-gray-800 transition-colors" />
        </Link>
        <WishlistIcon />
        <ShoppingCartIcon />
        {user ? (
          <div className="flex items-center gap-3">
            <Link href="/profile" className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 hover:border-gray-400 transition-all shadow-sm">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 text-white flex items-center justify-center text-[10px] font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="hidden md:block"
            >
              <button
                type="submit"
                className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-gray-800 cursor-pointer transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
