"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "next/navigation";

export default function EditProductPage() {

  const params = useParams();

  const [title, setTitle] = useState("");

  const [bigCode, setBigCode] = useState("");

  const [kidsCode, setKidsCode] = useState("");

  const [price, setPrice] = useState("");

  const [discount, setDiscount] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [loading, setLoading] =
    useState(true);

  const finalPrice =
    Number(price) -
    (Number(price) *
      Number(discount || 0)) /
      100;

  useEffect(() => {

    loadProduct();

  }, []);

  const loadProduct = async () => {

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/${params.id}`
      );

      const data = await res.json();

      setTitle(data.title || "");

      setBigCode(data.bigCode || "");

      setKidsCode(data.kidsCode || "");

      setPrice(data.price || "");

      setDiscount(data.discount || "");

      setDescription(
        data.description || ""
      );

      setCategory(data.category || "");

      setLoading(false);

    } catch (error) {

      console.log(error);

    }

  };

  const handleUpdate = async (
    e: any
  ) => {

    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/${params.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          title,

          bigCode,

          kidsCode,

          price,

          discount,

          finalPrice,

          description,

          category,

        }),

      }
    );

    if (res.ok) {

      alert("تم تعديل المنتج بنجاح");

    }

  };

  if (loading) {

    return (

      <section className="bg-black min-h-screen flex items-center justify-center text-white text-3xl">

        جاري التحميل...

      </section>

    );

  }

  return (

    <section className="bg-black min-h-screen py-20 px-6">

      <div className="max-w-4xl mx-auto bg-zinc-900 p-10 rounded-3xl border border-[#D4B06A]/20">

        <h1 className="text-5xl text-[#D4B06A] font-bold mb-12">

          تعديل المنتج

        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="اسم المنتج"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-black text-white"
          />

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="كود الكبير"
              value={bigCode}
              onChange={(e) =>
                setBigCode(e.target.value)
              }
              className="w-full p-5 rounded-2xl bg-black text-white"
            />

            <input
              type="text"
              placeholder="كود الأطفال"
              value={kidsCode}
              onChange={(e) =>
                setKidsCode(e.target.value)
              }
              className="w-full p-5 rounded-2xl bg-black text-white"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="number"
              placeholder="السعر"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full p-5 rounded-2xl bg-black text-white"
            />

            <input
              type="number"
              placeholder="الخصم"
              value={discount}
              onChange={(e) =>
                setDiscount(e.target.value)
              }
              className="w-full p-5 rounded-2xl bg-black text-white"
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
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full p-5 rounded-2xl bg-black text-white h-40"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-black text-white"
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

          <button
            className="w-full bg-[#D4B06A] text-black py-5 rounded-2xl text-2xl font-bold"
          >

            حفظ التعديلات

          </button>

        </form>

      </div>

    </section>

  );

}

