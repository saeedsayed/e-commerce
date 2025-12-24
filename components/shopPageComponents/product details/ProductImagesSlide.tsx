"use client";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import './styles.css';

// import required modules
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import SwiperButton from "@/components/homePageComponents/heroSection/SwiperButton";
import { Spinner } from "@/components/common";

type Props = {
  discountPercentage: number;
  images: string[];
  isNew?: boolean;
};

const ProductImagesSlide = ({ discountPercentage, images, isNew }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

  useEffect(() => {
    return () => {
      setThumbsSwiper(undefined);
    };
  }, []);

  return (
    <>
      <div className="relative p-2 sm:p-8 bg-primary  aspect-square md:aspect-auto md:min-h-[512px]">
        <div className="absolute z-10">
          {isNew && (
            <div className="bg-white w-20 mb-2 text-sm sm:text-lg text-text px-4 py-2 rounded-md font-bold">
              NEW
            </div>
          )}
          {discountPercentage > 0 && (
            <div
              className={`bg-badge w-20 text-sm sm:text-lg text-second-text px-4 py-2 rounded-md font-bold ${
                !discountPercentage && "opacity-0"
              }`}
            >
              -{discountPercentage}%
            </div>
          )}
        </div>
        {!images?.length ? (
          <Spinner />
        ) : (
          <Swiper
            spaceBetween={5}
            navigation={false}
            loop={true}
            thumbs={{
              swiper: thumbsSwiper,
            }}
            modules={[FreeMode, Thumbs]}
            className="select-none"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-square md:aspect-auto md:h-[512px]">
                  <Image src={image} alt="" fill className="object-contain" />
                </div>
              </SwiperSlide>
            ))}
            <SwiperButton />
          </Swiper>
        )}
      </div>
      <div className="hidden sm:block mt-6">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={24}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="select-none"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-100 aspect-square">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-contain border"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductImagesSlide;
