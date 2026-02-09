import { IOrder } from "@/types";
import Link from "next/link";
import React from "react";

interface Props {
  data: IOrder[];
}

const OrderTableForSmallDevices = ({ data }: Props) => {
  const header = ["Number ID", "Dates", "Status", "Price"];
  return (
    <div className="md:hidden">
      {data.map((item) => (
        <Link
          href={`/orders/${item._id}`}
          key={item._id}
          className="text-sm font-medium flex justify-between mb-4 pb-4 border-b border-b-[#E8ECEF]"
        >
          <div className="flex flex-col gap-3">
            {header.map((header) => (
              <p className="flex-1 text-sub-text" key={header}>
                {header}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="">#{item._id}</p>
            <p className="text-text">
              {new Date(item?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-text">{item.status}</p>
            <p className="text-text">${item.pricing.total}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrderTableForSmallDevices;
