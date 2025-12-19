import { ArrowLink } from "@/components/common";
import { IProduct } from "@/types";
import BestSellerSlide from "./BestSellerSlide";
import { axiosInstance } from "@/lib/axios";

const BestSeller = async () => {
  const { data } = await axiosInstance<{ data: IProduct[] }>(
    "home/latest-products"
  );
  return (
    <div className="container mt-12">
      <div className="flex justify-between mb-12 items-center">
        <h2 className="text-text text-2xl md:text-4xl font-bold">
          <p>New</p> Arrivals
        </h2>
        <ArrowLink href="shop">More Products</ArrowLink>
      </div>
      <BestSellerSlide data={data.data} />
    </div>
  );
};

export default BestSeller;
