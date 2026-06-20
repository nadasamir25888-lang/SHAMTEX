"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "next/navigation";

export default function ProductDetails() {

  const params = useParams();

  const [product, setProduct] =
    useState<any>(null);

  useEffect(() => {

    loadProduct();

  }, []);

  const loadProduct = async () => {

    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products/${params.id}`
      );

      const data = await res.json();

      setProduct(data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!product) {

    return (

      <section className="bg-black min-h-screen flex items-center justify-center text-white text-3xl">

        جاري التحميل...

      </section>

    );

  }

  return (

    <section className="bg-black min-h-screen py-20 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        <div>

          <img
            src={product.images?.[0]}
            className="w-full h-[600px] object-cover rounded-3xl mb-5"
          />

          <div className="grid grid-cols-4 gap-4">

            {product.images?.map(
              (image: string, index: number) => (

                <img
                  key={index}
                  src={image}
                  className="w-full h-32 object-cover rounded-2xl"
                />

              )
            )}

          </div>

        </div>

        <div>

          <h1 className="text-5xl font-bold text-white mb-6">

            {product.title}

          </h1>

          <div className="flex items-center gap-5 mb-8">

            <h2 className="text-5xl text-[#D4B06A] font-bold">

              {product.finalPrice} EGP

            </h2>

            <p className="text-2xl text-zinc-500 line-through">

              {product.price} EGP

            </p>

          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">

            <p className="text-zinc-300 leading-9 whitespace-pre-line">

              {product.description}

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}
