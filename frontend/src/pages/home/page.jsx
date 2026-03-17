"use client";

import dynamic from "next/dynamic";
import { useApiCache, useResponsive } from "@/hooks/index";
import { ApiService } from "@/utils";
import CosmeticLoader from "@/components/Loader/CosmeticLoader";
import { ProductSlider } from "@/components/Slider/GlamishSlider";
import { GlamishCard } from "@/components/ProductCards/GlamishCard";
import { ButtonPrimaryWithIcon } from "@components/Buttons/index";
import AxiosError from "@/components/Error/axiosError";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const HeroSection = dynamic(() => import("@/components/Hero2/glamishHero"), {
  ssr: true
});

const GlamishCategory = dynamic(() => import("@/components/ProductCategory/GlamishCategory"), {
  ssr: true
});

const BeautyBanner = dynamic(() => import("@/components/Banner/BeautyBanner"), {
  loading: () => <div> loading.... </div>,
  ssr: false
});
const NewsLetter = dynamic(() => import("@/components/NewsLetter"), {
  loading: () => <div> loading.... </div>,
  ssr: false
});


export default function GlamishHome() {
  const responsive = useResponsive(767);

  const [error, setError] = useState(null);

  const { data: products, loading } = useApiCache(
    'product/get-published?isFeatured=true',
    () => ApiService('GET', 'product/get-published?isFeatured=true')
      .then(res => res.data?.products || [])
      .catch(err => {
        return setError(err);
      })
  );

  return (
    <main className=" bg-orange-50">
      <div className="-mt-10" >
        <HeroSection />
      </div>

      <div className={`flex ${responsive ? "flex-col-reverse mt-10" : "flex-col"}`}>
        {/* Category Section */}
        <section
          aria-label="Product categories"
          className={` w-full  bg-orange-50 px-4 pb-12 md:px-6 lg:px-8`}
        >
          <div className="mb-4">
            <h2 itemProp="category" className="font-quicksand text-2xl font-bold tracking-tight">
              Browse Organic Beauty Products
            </h2>
            <p className="text-muted-foreground" itemProp="abstract">
              Find the best organic makeup, skincare, and haircare products.
            </p>
          </div>

          <GlamishCategory
            responsive={responsive}
          />


        </section>


        {/* Featured Products Section */}
        <section
          aria-label="Featured products"
          className={`${responsive ? "-mt-10" : "mt-10"} w-full  bg-orange-50 px-4 pb-12 md:px-6 lg:px-8`}
        >
          <h1 className="pacifico-bold text-2xl font-semibold">Exclusive Deals on Organic Skincare & Makeup</h1>
          <p className="text-muted-foreground mb-4">Get the best deals on our exclusive organic skincare and makeup products.</p>

          {loading ? (
            <div aria-live="polite">
              <CosmeticLoader isLoading={loading} className="h-[50vh] w-[90vw] mx-auto bg-gray-100 rounded-lg" />
            </div>
          ) :
            error && (<AxiosError error={error} />)
          }

          {products && products.length > 0 && (
            (
              <ProductSlider className="gap-4 sm:gap-6 md:gap-8">
                {products?.map((product) => (
                  <GlamishCard
                    key={product._id}
                    {...product}
                    imageProps={{
                      priority: products.indexOf(product) < 3
                    }}
                  />
                ))}
              </ProductSlider>
            )
          )}

          <div className="flex justify-center mt-6">
            <ButtonPrimaryWithIcon
              title="Browse All Products"
              icon={<ArrowUpRight />}
              className="!bg-transparent !text-orange-500 hover:!bg-orange-100  border !border-orange-500"
              href={"/products"}
            />
          </div>

        </section>

      </div>


      {/* Banner Section */}
      <section aria-label="Promotional banner" className="w-full px-4 pb-12 md:px-6 lg:px-8">
        <h1 className="pacifico-bold text-2xl font-semibold">
          Best-Selling Organic Skincare & Makeup
        </h1>
        <p className="text-muted-foreground mb-4">
          Discover top-rated organic beauty products loved by our customers—on sale now for a limited time.
        </p>

        <BeautyBanner />
      </section>

      {/* Newsletter */}
      <aside aria-label="Newsletter subscription" className="w-full  bg-orange-50 px-4 pb-12 md:px-6 lg:px-8">
        <NewsLetter />
      </aside>
    </main>
  );
}