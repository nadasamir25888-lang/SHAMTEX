"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  motion,
} from "framer-motion";

interface Product {

  _id: string;

  title: string;

  price: number;

  oldPrice?: number;

  images: string[];

  category?: string;

}

export default function Products() {
  const [products,
    setProducts] =
    useState<Product[]>([]);
  const [loading,
    setLoading] =
    useState(true);
  const [error,
    setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${apiUrl}/api/products`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          const errorMsg = `Failed to fetch products: ${res.status}`;
          throw new Error(errorMsg);
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error(err);
        setError(
          "حدث خطأ أثناء تحميل المنتجات. حاول مرة أخرى لاحقًا."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (

    <section
      id="products"
      className="relative py-32 px-6 overflow-hidden bg-[var(--bg-soft)]"
    >

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4B06A]/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-6 py-2 rounded-full bg-[#D4B06A]/10 border border-[#D4B06A]/20 text-[#D4B06A] font-bold mb-6">
            SHAM TEX COLLECTION
          </span>

          <h2 className="section-title text-5xl lg:text-7xl font-black mb-8 leading-tight">
            منتجات مختارة
            <span className="text-[#D4B06A]"> بعناية</span>
          </h2>

          <p className="text-zinc-400 text-xl max-w-3xl mx-auto leading-loose">
            اكتشف تشكيلة من المفروشات الراقية المصممة لتمنح منزلك إحساسًا بالفخامة
            والدفء مع خامات عالية الجودة وتصميمات عصرية فريدة.
          </p>
        </motion.div>

        {loading ? (
          <div className="col-span-full text-center py-24 text-[#D4B06A] text-2xl font-black">
            جاري تحميل المنتجات...
          </div>
        ) : error ? (
          <div className="col-span-full glass p-10 rounded-[35px] text-center">
            <p className="text-3xl font-black text-white mb-4">{error}</p>
            <p className="text-zinc-400">تأكد من تشغيل الخادم وحاول مرة أخرى.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="group relative rounded-[35px] overflow-hidden border border-white/10 bg-white/[0.8] shadow-[0_10px_30px_rgba(0,0,0,.08)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="absolute top-5 right-5 z-20">
                  <div className="bg-[#D4B06A] text-black text-sm font-black px-4 py-2 rounded-full shadow-2xl">
                    جديد
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <h3 className="section-title text-3xl">{product.title}</h3>

                  <div className="flex items-center gap-3 text-[#C7A86A]">
                    <span className="text-xl">⭐⭐⭐⭐⭐</span>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-black">4.9</span>
                  </div>

                  <p className="text-3xl font-black text-[#C7A86A]">{product.price} EGP</p>

                  <Link
                    href={`/product/${product._id}`}
                    className="inline-flex w-full items-center justify-center rounded-3xl bg-[#C7A86A] px-6 py-4 text-center font-black text-black transition hover:bg-[#B08B47]"
                  >
                    عرض المنتج
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

