"use client";

import {

  useEffect,

  useMemo,

  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  Package,

  Truck,

  CheckCircle2,

  Clock3,

  Trash2,

  Phone,

  MapPin,

  Wallet,

} from "lucide-react";

import toast from "react-hot-toast";

export default function OrdersPage() {

  const [orders,
    setOrders] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders =
    async () => {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/orders`
        );

        const data =
          await res.json();

        setOrders(data);

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    };

  /* UPDATE STATUS */

  const updateStatus =
    async (
      id: string,
      status: string
    ) => {

      try {

        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/orders/${id}`,
          {

            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status,
            }),

          }
        );

        toast.success(
          "تم تحديث الحالة"
        );

        loadOrders();

      } catch (error) {

        console.log(error);

      }

    };

  /* DELETE */

  const deleteOrder =
    async (
      id: string
    ) => {

      const confirmDelete =
        confirm(
          "هل تريد حذف الطلب؟"
        );

      if (
        !confirmDelete
      ) return;

      try {

        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/orders/${id}`,
          {
            method: "DELETE",
          }
        );

        toast.success(
          "تم حذف الطلب"
        );

        loadOrders();

      } catch (error) {

        console.log(error);

      }

    };

  /* ANALYTICS */

  const totalRevenue =
    useMemo(() => {

      return orders.reduce(

        (
          acc,
          order
        ) =>

          acc +
          (order.totalPrice || 0),

        0

      );

    }, [orders]);

  const deliveredOrders =
    orders.filter(
      (o) =>
        o.status ===
        "تم التسليم"
    ).length;

  const shippingOrders =
    orders.filter(
      (o) =>
        o.status ===
        "تم الشحن"
    ).length;

  const pendingOrders =
    orders.filter(
      (o) =>
        o.status ===
        "جديد"
    ).length;

  const stats = [

    {

      title:
        "إجمالي الطلبات",

      value:
        orders.length,

      icon:
        Package,

    },

    {

      title:
        "إجمالي الأرباح",

      value:
        `${totalRevenue} EGP`,

      icon:
        Wallet,

    },

    {

      title:
        "تم الشحن",

      value:
        shippingOrders,

      icon:
        Truck,

    },

    {

      title:
        "تم التسليم",

      value:
        deliveredOrders,

      icon:
        CheckCircle2,

    },

  ];

  return (

    <section className="min-h-screen py-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-14">

          <h1 className="text-6xl font-black text-[var(--text)] mb-4">

            إدارة الطلبات

          </h1>

          <p className="text-[var(--muted)] text-xl">

            متابعة وإدارة جميع طلبات العملاء

          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

          {stats.map((
            stat,
            index
          ) => {

            const Icon =
              stat.icon;

            return (

              <motion.div

                key={stat.title}

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    index * 0.1,
                }}

                className="glass-card p-8"
              >

                <div className="flex items-center justify-between mb-6">

                  <div className="w-16 h-16 rounded-2xl bg-[#D4B06A]/20 flex items-center justify-center">

                    <Icon
                      className="text-[#D4B06A]"
                      size={32}
                    />

                  </div>

                </div>

                <h3 className="text-[var(--muted)] text-lg mb-3">

                  {stat.title}

                </h3>

                <p className="text-[var(--primary)] text-4xl font-black">

                  {stat.value}

                </p>

              </motion.div>

            );

          })}

        </div>

        {/* LOADING */}

        {loading && (

          <div className="text-center text-white text-3xl py-20">

            جاري تحميل الطلبات...

          </div>

        )}

        {/* ORDERS */}

        <div className="glass-card rounded-3xl border border-[#E8DDCC] p-6">

          <div className="space-y-6">

            {orders.map((order) => {

              const status = order.status || "جديد";

              const getStatusClasses = (s: string) => {
                switch (s) {
                  case "جديد":
                    return "bg-amber-100 text-amber-700";
                  case "تم الشحن":
                    return "bg-blue-100 text-blue-700";
                  case "تم التسليم":
                    return "bg-green-100 text-green-700";
                  case "ملغي":
                    return "bg-red-100 text-red-700";
                  default:
                    return "bg-[#F5E8C9] text-[#8A7758]";
                }
              };

              return (

                <div key={order._id} className="glass-card rounded-3xl border border-[#E8DDCC] p-6">

                  <div className="flex items-center justify-between mb-4">

                    <div>

                      <h3 className="text-2xl font-black text-[var(--text)]">{order.customerName}</h3>

                      <p className="text-[var(--muted)]">{order.city}</p>

                    </div>

                    <div className="text-right">

                      <p className="text-[var(--primary)] text-3xl font-bold">{order.totalPrice} EGP</p>

                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses(status)}`}>{status}</span>

                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <select

                      value={order.status}

                      onChange={(e) => updateStatus(order._id, e.target.value)}

                      className="w-64 h-11 rounded-2xl border border-[#E8DDCC] bg-white px-3 text-sm text-[var(--text)] outline-none"
                    >

                      <option value="جديد">جديد</option>

                      <option value="جاري التجهيز">جاري التجهيز</option>

                      <option value="تم الشحن">تم الشحن</option>

                      <option value="تم التسليم">تم التسليم</option>

                      <option value="ملغي">ملغي</option>

                    </select>

                    <button onClick={() => deleteOrder(order._id)} className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">حذف</button>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

        {!loading &&
          orders.length === 0 && (

          <div className="glass rounded-[40px] p-20 text-center">

            <Package
              className="mx-auto text-zinc-500 mb-6"
              size={80}
            />

            <h2 className="text-4xl font-black text-white mb-4">

              لا توجد طلبات

            </h2>

            <p className="text-zinc-400 text-xl">

              ستظهر الطلبات الجديدة هنا

            </p>

          </div>

        )}

      </div>

    </section>

  );

}
