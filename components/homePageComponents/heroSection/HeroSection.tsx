import React from "react";
import HeroSlide from "./HeroSlide";
import { axiosInstance } from "@/lib/axios";

const HeroSection = async () => {
  const { data } = await axiosInstance<{ data: any }>("home/hero-section");
  return (
    <div className="container">
      <HeroSlide data={data.data} />
      <div className="flex flex-col md:flex-row gap-y-4 items-center mt-8 mb-10">
        <h2 className="text-[40px] lg:text-5xl xl:text-7xl font-medium flex-1">
          Simply Unique/
          <br /> Simply Better.
        </h2>
        <p className="flex-1 text-sub-text font-semibold">
          <span className="text-text">3legant</span> is a gift & decorations
          store based in HCMC, Vietnam. Est since 2026.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
