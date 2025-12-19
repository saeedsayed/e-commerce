import ArrowLink from "@/components/common/ArrowLink";
import { ICategory } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

interface IProps {
  size: string;
  data: ICategory;
}

const CategoryCard = ({ size, data }: IProps) => {
  return (
    <Link
      href={`/shop?category=${data?.name}`}
      className={`flex gap-12 ${size === "lg" ? "flex-col" : "flex-row"
        } flex-1 bg-primary p-8 md:p-12`}
    >
      <div>
        <h3 className="text-2xl md:text-[34px] mb-3">{data?.name}</h3>
        <div className="text-sub-text whitespace-nowrap inline-flex items-center gap-2
         border-b-2 [&:hover_.arrow]:translate-x-1 [&:hover]:text-blue-500">
          Shop Now <FaArrowRight className="arrow transition-all" />
        </div>
      </div>
      <div
        className={`min-w-[100px] w-full relative ${size === "lg" ? "h-48 lg:h-96" : "h-28 lg:h-48"
          }`}
      >
        <Image
          src={data?.image}
          alt={data?.name}
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default CategoryCard;
