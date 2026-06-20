"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  motion,
} from "framer-motion";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import {
  LayoutDashboard,
  Package,
  PlusSquare,
  ShoppingCart,
  Truck,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import toast from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] =
    useState(true);

  /* VERIFY AUTH */

  useEffect(() => {

    verifyAdmin();

  }, []);

  const verifyAdmin = async () => {

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/verify`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!data.authenticated) {

        router.push("/login");

        return;

      }

    } catch (error) {

      console.log(error);

      router.push("/login");

    } finally {

      setLoading(false);

    }

  };

  /* LOGOUT */

  const handleLogout = async () => {

    try {

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      toast.success(
        "تم تسجيل الخروج"
      );

      router.push("/login");

    } catch {

      toast.error(
        "حدث خطأ"
      );

    }

  };

  /* LINKS */

  const links = [

    {
      name: "الرئيسية",
      href: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "المنتجات",
      href: "/dashboard/products",
      icon: Package,
    },

    {
      name: "إضافة منتج",
      href: "/dashboard/add-product",
      icon: PlusSquare,
    },

    {
      name: "الطلبات",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },

    {
      name: "الشحن",
      href: "/dashboard/shipping",
      icon: Truck,
    },

  ];

  /* LOADING */

  if (loading) {

    return (

      <div className="min-h-screen bg-[#F5EFE4] flex items-center justify-center">

        <div className="text-[var(--text)] text-3xl font-bold animate-pulse">

          جاري التحقق...

        </div>

      </div>

    );

  }

  return (

    <section className="min-h-screen flex bg-[#F5EFE4] text-[var(--text)]">

      {/* SIDEBAR */}

      <motion.aside

        initial={{
          x: -80,
          opacity: 0,
        }}

        animate={{
          x: 0,
          opacity: 1,
        }}

        transition={{
          duration: 0.7,
        }}

        className="w-[320px] hidden lg:flex flex-col bg-white border-r border-[#E8DDCC] p-8"
      >

        {/* LOGO */}

        <div className="mb-14">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-3xl bg-[#D4B06A]/20 flex items-center justify-center">

              <ShieldCheck
                className="text-[#D4B06A]"
                size={34}
              />

            </div>

            <div>

              <h1 className="text-4xl font-black text-[#D4B06A]">

                Sham Tex

              </h1>

              <p className="text-zinc-500">

                Admin Dashboard

              </p>

            </div>

          </div>

        </div>

        {/* LINKS */}

        <div className="space-y-4 flex-1">

          {links.map((link) => {

            const Icon = link.icon;

            const active =
              pathname === link.href;

            return (

              <Link

                key={link.href}

                href={link.href}

                className={`

                  flex
                  items-center
                  gap-4
                  p-5
                  rounded-3xl
                  text-xl
                  transition-all
                  duration-300
                  hover:scale-[1.03]

                  ${

                    active

                      ? "bg-[#C7A86A] text-white font-black shadow-2xl"

                      : "bg-white text-[var(--text)] hover:bg-[#F5EFE4]"

                  }

                `}
              >

                <Icon size={28} />

                {link.name}

              </Link>

            );

          })}

        </div>

        {/* LOGOUT */}

        <button

          onClick={handleLogout}

          className="mt-10 bg-[#C7A86A] hover:bg-[#B08B47] transition-all text-white h-16 rounded-3xl text-xl font-black flex items-center justify-center gap-3"
        >

          <LogOut size={24} />

          تسجيل الخروج

        </button>

      </motion.aside>

      {/* CONTENT */}

      <main className="flex-1 overflow-auto p-6 lg:p-10">

        {children}

      </main>

    </section>

  );

}
