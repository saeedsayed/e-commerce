import ArrowLink from "@/components/common/ArrowLink";
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative md:w-1/2 h-[532px]">
        <Image src={"/images/banner_1.jpeg"} alt="banner image" fill sizes="fill"/>
      </div>
      <div className=" md:w-1/2 p-8 bg-primary ps-6 md:ps-16 flex flex-col items-start justify-center gap-5">
        <p className="text-blue-600 font-bold">SALE UP TO 35% OFF</p>
        <h4 className="text-4xl font-medium">
          HUNDREDS of <br />
          New lower prices!
        </h4>
        <p className="text-xl">
          It’s more affordable than ever to give every <br className="hidden md:block"/> room in your home
          a stylish makeover
        </p>
        <ArrowLink href="">shop now</ArrowLink>
      </div>
    </div>
  );
};

export default Banner;
