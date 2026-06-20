"use client";

import { useEffect, useState } from "react";

interface Product {

  _id: string;

  title: string;

  price: number;

  finalPrice: number;

  discount: number;

  category: string;

  images: string[];

}

export default function DashboardProducts() {

  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {

    try {

      setLoading(true);

      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`
      );

      const data = await res.json();

      if (Array.isArray(data)) {

        setProducts(data);

      } else {

        setProducts([]);

      }

    } catch (error) {

      console.log(error);

      setProducts([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProducts();

  }, []);

  const deleteProduct = async (id: string) => {

    const confirmDelete = confirm(
      "هل تريد حذف المنتج؟"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      loadProducts();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <section className="bg-[var(--bg)] min-h-screen py-20 px-6 text-[var(--text)]">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between mb-12">

          <h1 className="text-5xl font-black text-[var(--primary)]">
            إدارة المنتجات
          </h1>

          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border border-[#E8DDCC] text-[var(--text)] p-4 rounded-2xl w-full md:w-96 outline-none focus:border-[var(--primary)]"
          />

        </div>

        {loading ? (

          <div className="text-center text-white text-2xl">
            جاري تحميل المنتجات...
          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="text-center text-zinc-400 text-2xl">
            لا توجد منتجات
          </div>

        ) : (

          <div className="grid md:grid-cols-4 gap-8">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="glass-card hover-card overflow-hidden"
              >

                <img
                  src={
                    product.images?.[0] ||
                    "/placeholder.png"
                  }
                  className="w-full h-72 object-cover"
                />

                <div className="p-5">

                  <span className="text-xs bg-[#F5E8C9] text-[#8A7758] px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                  <h2 className="text-zinc-900 text-2xl font-bold my-4 line-clamp-1">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-3 mb-3">

                    <p className="text-[var(--primary)] text-3xl font-bold">
                      {product.finalPrice} EGP
                    </p>

                    <p className="text-zinc-500 line-through">
                      {product.price} EGP
                    </p>

                  </div>

                  <div className="bg-[#F5E8C9] text-[#8A7758] text-sm px-3 py-1 rounded-xl inline-block mb-5">
                    خصم {product.discount}%
                  </div>

                  <div className="flex gap-2">

                    <a
                      href={`/dashboard/products/${product._id}`}
                      className="flex-1 h-12 rounded-xl outline-btn flex items-center justify-center font-bold"
                    >
                      عرض
                    </a>

                    <a
                      href={`/dashboard/products/edit/${product._id}`}
                      className="flex-1 h-12 rounded-xl gold-btn flex items-center justify-center font-bold"
                    >
                      تعديل
                    </a>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 h-12 rounded-xl bg-red-500 text-white font-bold"
                    >
                      حذف
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}
