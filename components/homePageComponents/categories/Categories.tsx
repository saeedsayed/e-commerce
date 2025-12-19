import React from "react";
import CategoryCard from "./CategoryCard";
import { getData } from "@/lib/getAPI";
import { axiosInstance } from "@/lib/axios";
import { ICategory } from "@/types";

const Categories = async () => {
  const { data } = await axiosInstance<{ data: ICategory[] }>(
    "home/featured-categories"
  );
  return (
    <div className="flex gap-6 flex-col sm:flex-row container">
      <>
        <CategoryCard size="lg" data={data.data[0]} />
        <div className="flex flex-col flex-1 gap-6">
          <CategoryCard size="sm" data={data.data[1]} />
          <CategoryCard size="sm" data={data.data[2]} />
        </div>
      </>
    </div>
  );
};

export default Categories;
