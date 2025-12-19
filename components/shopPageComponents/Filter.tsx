import { ICategory } from "@/types";

import { VscSettings } from "react-icons/vsc";
import SliderRange from "./SliderRange";
import Link from "next/link";

import { axiosInstance } from "@/lib/axios";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Filter = async ({ searchParams }: Props) => {
  const {
    data: { data: categories },
  } = await axiosInstance<{ data: ICategory[] }>("categories");

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xl font-semibold flex gap-2 items-center">
        <VscSettings /> Filter
      </h3>
      <div>
        {/*category filter*/}
        <h4 className="text-lg font-medium mb-3 uppercase">categories</h4>
        <ul className="flex flex-col gap-3 max-h-[226px] overflow-auto">
          {categories.length === 0 ? (
            [...Array(5)].map((_, i) => (
              <li
                key={i}
                className="animate-pulse h-[16px] w-52 bg-primary"
              ></li>
            ))
          ) : (
            <>
              <li>
                <Link
                  className={`text-sub-text font-semibold ${
                    !searchParams?.category
                      ? "text-text border-b border-b-black"
                      : ""
                  }`}
                  href={"/shop"}
                  scroll={false}
                >
                  All
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category._id}>
                  <Link
                    className={`text-sub-text font-semibold ${
                      searchParams?.category === category.name
                        ? "text-text border-b border-b-black"
                        : ""
                    }`}
                    href={`/shop?category=${category.name}${
                      searchParams.minPrice
                        ? `&minPrice=${searchParams.minPrice}`
                        : ""
                    }${
                      searchParams.maxPrice
                        ? `&maxPrice=${searchParams.maxPrice}`
                        : ""
                    }`}
                    scroll={false}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
      <div>
        {/*price filter*/}
        <h4 className="text-lg font-medium mb-3 uppercase">price</h4>
        <SliderRange />
      </div>
    </div>
  );
};

export default Filter;
