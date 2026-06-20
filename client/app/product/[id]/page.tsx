// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  discount?: number;
  finalPrice?: number;
}

export default function ProductPage() {
  const params = useParams();
  console.log("PARAMS:", params);
  console.log("ID:", params?.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(
          `${baseURL}/api/products/${params.id}`
        );
        const data = await res.json();
        console.log(data);
        console.log("Product Price:", data.price);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (params?.id) {
      loadProduct();
    }
  }, [params?.id, baseURL]);

  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(0);
    }
  }, [product]);

  useEffect(() => {
    if (!product?.category) return;

    const loadRelated = async () => {
      try {
        const res = await fetch(`${baseURL}/api/products`);
        const data: Product[] = await res.json();
        setRelatedProducts(
          data.filter(
            (item) =>
              item.category === product.category && item._id !== product._id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    loadRelated();
  }, [product?.category, product?._id, baseURL]);

  useEffect(() => {
    if (product) {
      console.log("PRODUCT DATA:", product);
      console.log("IMAGES:", product.images);
      console.log("DESCRIPTION:", product.description);
      console.log("KEYS:", Object.keys(product));
    }
  }, [product]);

  if (!product) {
    return (
      <section className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center">
        <div className="text-2xl font-black text-[var(--primary)]">جاري التحميل...</div>
      </section>
    );
  }
  return (
    <section dir="rtl" className="min-h-screen bg-[var(--bg)] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* الصور */}
          <div>
            <div className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-[#E8DDCC]">
              <img
                src={product.images?.[selectedImage] || product.images?.[0] || "/hero-1.webp"}
                alt={product.title}
                className="w-full h-[650px] object-cover hover:scale-105 duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-5">
              {product.images?.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-3xl overflow-hidden border border-[#E8DDCC] cursor-pointer hover:scale-105 duration-300 ${selectedImage === index ? 'ring-2 ring-[var(--primary)]' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt="" className="w-full h-28 object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* البيانات */}
          <div className="space-y-6">
            <span className="inline-flex bg-[#EFE7DA] text-[#B08B47] px-5 py-2 rounded-full font-semibold">
              الأكثر مبيعاً
            </span>
            <h1 className="text-5xl font-black text-[var(--text)]">{product.title}</h1>
            <div className="flex items-center gap-3">
              <span className="text-2xl text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="text-[var(--muted)]">152 تقييم</span>
            </div>

            {/* السعر */}
            <div className="bg-white rounded-[35px] p-8 shadow-lg border border-[#E8DDCC]">
              {(product.discount ?? 0) > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#EFE7DA] text-[#B08B47] px-4 py-2 rounded-full font-bold">
                    {`وفر %${product.discount ?? 0}`}
                  </span>
                </div>
              )}
              <h2 className="text-6xl font-black text-[var(--primary)]">{product.finalPrice || product.price} EGP</h2>
              {(product.discount ?? 0) > 0 && (
                <p className="line-through text-[var(--muted)] mt-2">{product.price} EGP</p>
              )}
            </div>

            {/* وصف */}
            <div className="bg-white rounded-[35px] p-8 shadow-lg border border-[#E8DDCC]">
              <h3 className="text-2xl font-black mb-5">وصف المنتج</h3>
              <p className="leading-10 text-lg text-[var(--muted)] whitespace-pre-line">{product.description}</p>
            </div>

            {/* المميزات */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-5 shadow border border-[#E8DDCC]">✓ خامات فندقية</div>
              <div className="bg-white rounded-3xl p-5 shadow border border-[#E8DDCC]">✓ ألوان ثابتة</div>
              <div className="bg-white rounded-3xl p-5 shadow border border-[#E8DDCC]">✓ سهل الغسيل</div>
              <div className="bg-white rounded-3xl p-5 shadow border border-[#E8DDCC]">✓ شحن سريع</div>
            </div>

            {/* أزرار */}
            <div className="flex gap-4">
              <button className="flex-1 py-5 rounded-3xl bg-[var(--primary)] text-white font-bold text-lg hover:bg-[var(--primary-dark)] duration-300">اطلب الآن</button>
              <button
                onClick={() =>
                  addToCart({
                    _id: product._id,
                    title: product.title,
                    price: product.price,
                    finalPrice: product.finalPrice,
                    images: product.images,
                  })
                }
                className="gold-btn px-8 py-4 rounded-3xl"
              >
                إضافة للسلة
              </button>
            </div>
          </div>
        </div>

        {/* منتجات مشابهة */}
        <section className="mt-24">
          <h2 className="text-4xl font-black mb-10">منتجات مشابهة</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item._id} href={`/product/${item._id}`} className="bg-white rounded-[30px] overflow-hidden shadow-lg border border-[#E8DDCC]">
                <img src={item.images?.[0]} alt={item.title} className="w-full h-64 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold mb-3">{item.title}</h3>
                  <p className="text-[var(--primary)] font-black text-xl">{item.price} EGP</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}