"use client";

import { useState } from "react";

export default function AddProductPage() {

  const [title, setTitle] = useState("");

  const [bigCode, setBigCode] = useState("");

  const [kidsCode, setKidsCode] = useState("");

  const [price, setPrice] = useState("");

  const [discount, setDiscount] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [images, setImages] = useState<FileList | null>(null);

  const finalPrice =
    Number(price) -
    (Number(price) * Number(discount || 0)) / 100;

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append("bigCode", bigCode);

    formData.append("kidsCode", kidsCode);

    formData.append("price", price);

    formData.append("discount", discount);

    formData.append("description", description);

    formData.append("category", category);

    if (images) {

      for (let i = 0; i < images.length; i++) {

        formData.append("images", images[i]);

      }

    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {

      alert("تم إضافة المنتج بنجاح");

      location.reload();

    }

  };

  return (

    <section className="bg-black min-h-screen py-20 px-6">

      <div className="max-w-4xl mx-auto bg-white border border-[#E8DDCC] rounded-3xl p-10">

        <h1 className="text-5xl text-[#D4B06A] font-bold mb-12">
          إضافة منتج
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="اسم المنتج"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border border-[#E8DDCC] bg-white text-black"
          />

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="كود الكبير"
              value={bigCode}
              onChange={(e) => setBigCode(e.target.value)}
              className="w-full h-14 px-4 rounded-2xl border border-[#E8DDCC] bg-white text-black"
            />

            <input
              type="text"
              placeholder="كود الأطفال"
              value={kidsCode}
              onChange={(e) => setKidsCode(e.target.value)}
              className="w-full h-14 px-4 rounded-2xl border border-[#E8DDCC] bg-white text-black"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="number"
              placeholder="السعر"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-14 px-4 rounded-2xl border border-[#E8DDCC] bg-white text-black"
            />

            <input
              type="number"
              placeholder="الخصم %"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full h-14 px-4 rounded-2xl border border-[#E8DDCC] bg-white text-black"
            />

          </div>

          <div className="bg-black p-5 rounded-2xl border border-[#D4B06A]/20">

            <p className="text-zinc-400 mb-2">
              السعر بعد الخصم
            </p>

            <h2 className="text-4xl text-[#D4B06A] font-bold">
              {finalPrice || 0} EGP
            </h2>

          </div>

          <textarea
            placeholder="وصف المنتج"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-40 px-4 py-4 rounded-2xl border border-[#E8DDCC] bg-white text-black"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border border-[#E8DDCC] bg-white text-black"
          >

            <option value="">
              اختر القسم
            </option>

            <option value="مفارش تركي">
              مفارش تركي
            </option>

            <option value="ملايات">
              ملايات
            </option>

            <option value="بطاطين">
              بطاطين
            </option>

            <option value="أطقم سفرة">
              أطقم سفرة
            </option>

            <option value="مناشف">
              مناشف
            </option>

          </select>

          <div className="bg-white p-6 rounded-2xl border border-[#E8DDCC]">

            <input
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
              className="w-full text-black"
            />

          </div>

          <button
            className="w-full bg-[#D4B06A] text-black py-5 rounded-2xl text-2xl font-bold hover:scale-105 transition"
          >
            إضافة المنتج
          </button>

        </form>

      </div>

    </section>

  );

}
