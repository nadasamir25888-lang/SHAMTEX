"use client";

import {
  useEffect,
  useState
} from "react";

export default function ShippingPage() {

  const [shipping, setShipping] =
    useState<any[]>([]);

  const [governorate,
    setGovernorate] =
    useState("");

  const [price, setPrice] =
    useState("");

  const governorates = [

  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "البحر الأحمر",
  "البحيرة",
  "الفيوم",
  "الغربية",
  "الإسماعيلية",
  "المنوفية",
  "المنيا",
  "القليوبية",
  "الوادي الجديد",
  "السويس",
  "اسوان",
  "اسيوط",
  "بني سويف",
  "بورسعيد",
  "دمياط",
  "الشرقية",
  "جنوب سيناء",
  "كفر الشيخ",
  "مطروح",
  "الأقصر",
  "قنا",
  "شمال سيناء",
  "سوهاج",

];

  const addAllGovernorates =
  async () => {

    for (const gov of governorates) {

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/shipping`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            governorate: gov,

            price: 0,

          }),

        }
      );

    }

    loadShipping();

    alert(
      "تم إضافة المحافظات"
    );

  };

  useEffect(() => {

    loadShipping();

  }, []);

  const loadShipping = async () => {

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/shipping`
      );

      const data = await res.json();

      setShipping(data);

    } catch (error) {

      console.log(error);

    }

  };

  const addShipping = async (
    e: any
  ) => {

    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/shipping`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          governorate,

          price,

        }),

      }
    );

    if (res.ok) {

      setGovernorate("");

      setPrice("");

      loadShipping();

    }

  };

  const updateShipping =
    async (
      id: string,
      newPrice: number
    ) => {

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/shipping/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            price: newPrice,

          }),

        }
      );

      loadShipping();

    };

  return (

    <section className="bg-[var(--bg)] min-h-screen py-20 px-6 text-[var(--text)]">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-black text-[var(--primary)] mb-10">

          أسعار الشحن

        </h1>

        <button
          onClick={addAllGovernorates}
          className="gold-btn px-8 py-4 rounded-2xl font-bold text-xl mb-10"
        >

          إضافة كل المحافظات

        </button>

        {/* ADD */}

        <form
          onSubmit={addShipping}
          className="glass-card p-8 rounded-3xl mb-10 grid md:grid-cols-3 gap-5"
        >

          <select
            value={governorate}
            onChange={(e) =>
              setGovernorate(
                e.target.value
              )
            }
            className="bg-white p-5 rounded-2xl text-[var(--text)] border border-[#E8DDCC]"
          >

            <option value="">
              اختر المحافظة
            </option>

            {governorates.map((gov) => (

              <option
                key={gov}
                value={gov}
              >
                {gov}
              </option>

            ))}

          </select>

          <input
            type="number"
            placeholder="سعر الشحن"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="bg-white p-5 rounded-2xl text-[var(--text)] border border-[#E8DDCC]"
          />

          <button
            className="gold-btn rounded-2xl font-bold text-xl"
          >
            إضافة
          </button>

        </form>

        {/* SHIPPING */}

        <div className="space-y-5">

          {shipping.map((item) => (

            <div
              key={item._id}
              className="glass-card p-6 rounded-3xl flex items-center justify-between border border-[#E8DDCC]"
            >

              <div>

                <h2 className="text-3xl text-[var(--text)] font-bold mb-2">

                  {item.governorate}

                </h2>

                <p className="text-[var(--primary)] text-2xl">

                  {item.price} EGP

                </p>

              </div>

              <input
                type="number"
                defaultValue={item.price}
                onBlur={(e) =>
                  updateShipping(
                    item._id,
                    Number(e.target.value)
                  )
                }
                className="bg-white text-[var(--text)] p-4 rounded-2xl w-40 border border-[#E8DDCC]"
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}
