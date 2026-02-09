'use client';
import { IOrder } from "@/types";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  data: IOrder[];
}

const OrdersTable = ({ data }: Props) => {
  const header = ["Number ID", "Dates", "Status", "Price"]
  const router = useRouter()
  return (
    <div className="overflow-x-auto hidden md:block">
      <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
        {/* head */}
        <thead>
          <tr>
            {header.map((item) => (
              <th
                key={item}
                className="whitespace-nowrap py-2 font-medium text-sub-text text-start"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        {/* Body */}
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item._id} className="cursor-pointer" onClick={() => router.push(`/orders/${item._id}`)}>
              <td className="whitespace-nowrap text-text text-sm py-6 font-normal">
                #{item._id}
              </td>
              <td className="whitespace-nowrap text-text text-sm py-6 font-normal">
                 {new Date(item?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
              </td>
              <td className="whitespace-nowrap text-text text-sm py-6 font-normal">
                {item.status}
              </td>
              <td className="whitespace-nowrap text-text text-sm py-6 font-normal">
                ${item.pricing.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
