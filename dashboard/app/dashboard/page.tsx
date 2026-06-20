"use client";

import {
  useEffect,
  useState
} from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";
export default function DashboardPage() {

  const [products,
    setProducts] =
    useState<any[]>([]);

  const [orders,
    setOrders] =
    useState<any[]>([]);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      // PRODUCTS

      const productsRes =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`
        );

      const productsData =
        await productsRes.json();

      setProducts(productsData);

      // ORDERS

      const ordersRes =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/orders`
        );

      const ordersData =
        await ordersRes.json();

      setOrders(ordersData);

    } catch (error) {

      console.log(error);

    }

  };

  // TOTAL PROFITS

  const totalProfits =
    orders.reduce(
      (acc, item) =>
        acc + item.totalPrice,
      0
    );

  // NEW ORDERS

  const newOrders =
    orders.filter(
      (item) =>
        item.status === "جديد"
    );

  const chartData = [

    {
      name: "السبت",
      orders: 4,
      profits: 12000,
    },

    {
      name: "الأحد",
      orders: 7,
      profits: 18000,
    },

    {
      name: "الإثنين",
      orders: 5,
      profits: 14000,
    },

    {
      name: "الثلاثاء",
      orders: 9,
      profits: 26000,
    },

    {
      name: "الأربعاء",
      orders: 6,
      profits: 17000,
    },

    {
      name: "الخميس",
      orders: 12,
      profits: 35000,
    },

  ];

  return (

    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="min-h-screen py-20 px-6"
    >

      <div className="max-w-7xl mx-auto">

        <div className="mb-12">

          <h1 className="text-6xl font-black text-[var(--text)] mb-4">

            لوحة التحكم

          </h1>

          <p className="text-[var(--muted)] text-xl">

            متابعة المتجر والإحصائيات والطلبات

          </p>

        </div>

        {/* STATS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="grid lg:grid-cols-4 gap-6 mb-14"
        >

          {/* PRODUCTS */}

          <div className="bg-white border border-[#E8DDCC] rounded-3xl shadow-lg hover:-translate-y-1 transition-all p-8">

            <p className="text-[var(--muted)] mb-4">

              المنتجات

            </p>

            <h2 className="text-[var(--text)] text-5xl font-black">

              {products.length}

            </h2>

          </div>

          {/* ORDERS */}

          <div className="bg-white border border-[#E8DDCC] rounded-3xl shadow-lg hover:-translate-y-1 transition-all p-8">

            <p className="text-[var(--muted)] mb-4">

              الطلبات

            </p>

            <h2 className="text-[var(--text)] text-5xl font-black">

              {orders.length}

            </h2>

          </div>

          {/* PROFITS */}

          <div className="bg-white border border-[#E8DDCC] rounded-3xl shadow-lg hover:-translate-y-1 transition-all p-8">

            <p className="text-[var(--muted)] mb-4">

              الأرباح

            </p>

            <h2 className="text-[var(--text)] text-4xl font-black">

              {totalProfits} EGP

            </h2>

          </div>

          {/* NEW ORDERS */}

          <div className="bg-white border border-[#E8DDCC] rounded-3xl shadow-lg hover:-translate-y-1 transition-all p-8">

            <p className="text-[var(--muted)] mb-4">

              طلبات جديدة

            </p>

            <h2 className="text-[var(--text)] text-5xl font-black">

              {newOrders.length}

            </h2>

          </div>

        </motion.div>

        {/* LAST ORDERS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          className="bg-white border border-[#E8DDCC] rounded-[32px] p-8 shadow-lg mb-10"
        >

          <div className="flex items-center justify-between mb-10">

            <div>

              <h2 className="text-4xl font-bold text-[var(--text)] mb-3">

                إحصائيات الأرباح

              </h2>

              <p className="text-[var(--muted)]">

                متابعة الطلبات والأرباح

              </p>

            </div>

          </div>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={chartData}
              >

                <defs>

                  <linearGradient
                    id="colorProfit"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#C7A86A"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#C7A86A"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <XAxis
                  dataKey="name"
                  stroke="#999"
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="profits"
                  stroke="#C7A86A"
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

        <div className="bg-white rounded-[32px] p-8 border border-[#E8DDCC] shadow-lg">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl text-[var(--text)] font-bold">

              آخر الطلبات

            </h2>

          </div>

          <div className="space-y-5">

            {orders.slice(0, 5).map((order) => (

              <div
                key={order._id}
                className="bg-[#FAF7F2] border border-[#E8DDCC] p-6 rounded-2xl flex items-center justify-between"
              >

                <div>

                  <h3 className="text-[var(--text)] text-2xl font-bold mb-2">

                    {order.customerName}

                  </h3>

                  <p className="text-[var(--muted)]">

                    {order.governorate}

                  </p>

                </div>

                <div>

                  <p className="text-[var(--primary)] text-3xl font-bold">

                    {order.totalPrice} EGP

                  </p>

                </div>

                <div>

                  <span className="bg-[#F5E8C9] text-[#8A7758] px-5 py-2 rounded-xl font-bold">

                    {order.status}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </motion.section>

  );

}
