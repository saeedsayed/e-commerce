import {
  PageHeader,
  ProductCard,
  ProductCardSkeleton,
} from "@/components/common";
import Filter from "@/components/shopPageComponents/Filter";
import { axiosInstance } from "@/lib/axios";
import { IProduct } from "@/types";
import { Suspense } from "react";
import Image from "next/image";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const {
    data: { data: products },
  } = await axiosInstance<{ data: IProduct[] }>(
    `products?${params.category ? `category=${params.category}&` : ""}${
      params.minPrice ? `minPrice=${params.minPrice}&` : ""
    }${params.maxPrice ? `maxPrice=${params.maxPrice}` : ""}`
  );

  return (
    <div className="container">
      <PageHeader
        bg={"/images/header_bg_1.jpeg"}
        title={"Shop Page"}
        description={"Let’s design the place you always imagined."}
        paths={[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ]}
      />
      <div className="my-8 md:mt-14 flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-[262px] md:sticky top-6">
          <Filter searchParams={params} />
        </div>
        <div className="flex-1 m-auto">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-semibold text-black">
              {params?.category ? params?.category : "All"}
            </h3>
            <div className="w-36 md:w-96 h-8 bg-primary"></div>
          </div>
          <Suspense
            fallback={
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            {products.length == 0 ? (
              <div className="grid place-items-center">
                <Image
                  src={"/images/empty_box.png"}
                  alt="empty"
                  width={200}
                  height={200}
                />
                <p className="text-center text-lg font-bold">
                  No products were found for{" "}
                  <span className="text-badge">{params?.category}</span>{" "}
                  Categories within the Price{" "}
                  <span className="text-badge">
                    {" "}
                    Range of ${params.minPrice} to ${params.maxPrice}
                  </span>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {products.map((product) => (
                  <ProductCard key={product._id} data={product} />
                ))}
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
