"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import ProductCard from "@/components/common/ProductCard";
import { A11y, Scrollbar } from "swiper/modules";
import { IProduct } from "@/types";


type Props = {
  data: IProduct[]
}

const BestSellerSlide = ({ data }: Props) => {
  return (
    <div>
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={24}
        slidesPerView={"auto"}
        // centeredSlides={true}
        scrollbar={{ draggable: true }}
        className="[&_.swiper-slide]:w-[252px]"
      >
        {data.map((product) => (
          <SwiperSlide key={product._id} className="mb-12">
            <ProductCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestSellerSlide;
