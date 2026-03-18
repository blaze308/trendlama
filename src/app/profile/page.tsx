import { auth, signOut } from "@/lib/auth";
import { User, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  // Mock order data
  const orders = [
    {
      id: "ORD-72910",
      date: "Oct 12, 2025",
      total: 129.5,
      status: "Delivered",
    },
    {
      id: "ORD-55214",
      date: "Sep 28, 2025",
      total: 84.2,
      status: "Processing",
    },
  ];

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-12">
      {/* SIDEBAR */}
      <div className="w-full lg:w-4/12 flex flex-col gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-4 text-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 text-white flex items-center justify-center text-4xl font-bold uppercase">
                {user.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          <div className="w-full h-[1px] bg-gray-100 my-2" />
          <nav className="w-full flex flex-col gap-1">
            {[
              { icon: User, label: "Edit Profile", active: true },
              { icon: Package, label: "My Orders", active: false },
              { icon: Settings, label: "Settings", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  item.active
                    ? "bg-gray-100 text-gray-800 font-medium"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            ))}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-50 transition-all text-sm cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full lg:w-8/12 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-800">Account Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-1">
              <span className="text-xs text-gray-400 uppercase font-medium tracking-wide">
                Total Orders
              </span>
              <span className="text-2xl font-bold text-gray-800">12</span>
            </div>
            <div className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-1">
              <span className="text-xs text-gray-400 uppercase font-medium tracking-wide">
                Member Since
              </span>
              <span className="text-2xl font-bold text-gray-800">Jan 2025</span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mt-4">Recent Orders</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-400 font-medium uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 px-6">ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 px-6 font-medium text-gray-800">
                      {order.id}
                    </td>
                    <td className="p-4 text-gray-500">{order.date}</td>
                    <td className="p-4 text-gray-800 font-semibold">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="p-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
