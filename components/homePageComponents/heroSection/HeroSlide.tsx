"use client";
import { CSSProperties } from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperButton from "./SwiperButton";
import Image from "next/image";

const swiperStyle = {
  "--swiper-pagination-color": "#FEFEFE",
} as CSSProperties;

type Props = {
  data?: String[];
};

const HeroSlide = ({ data }: Props) => {
  return (
    <div>
      <Swiper
        className="max-h-[calc(100vh-104px)]"
        style={swiperStyle}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
        // navigation
        pagination={{ clickable: true }}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-80 sm:h-[calc(100vh-110px)]">
              <Image
                src={item as string}
                fill
                alt="hero image"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
        <SwiperButton />
      </Swiper>
    </div>
  );
};

export default HeroSlide;
