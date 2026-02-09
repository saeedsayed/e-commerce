import { Button } from "@/components/common";
import { axiosInstance } from "@/lib/axios";
import { IOrder } from "@/types/order";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

type Props = {
  orderId: string;
};

const CompleteOrderCard = async ({ orderId }: Props) => {
  const {
    data: { data: orderDetail },
  } = await axiosInstance<{ data: IOrder }>(`orders/history/${orderId}`);
  return (
    <div className="bg-white rounded-lg shadow-md py-14 flex flex-col items-center justify-center">
      <h3 className="text-2xl text-[#6C7275]">Thank you! 🎉</h3>
      <h2 className="mt-4 mb-10 text-4xl font-semibold">
        Your order has been received
      </h2>
      <div className="flex gap-8 flex-wrap">
        {orderDetail?.items.map((product) => (
          <Link
            href={"/shop/" + product.product._id}
            className="bg-primary p-4 relative"
            key={product.product._id}
          >
            <Image
              src={product.product.thumbnail}
              alt={product.product.title}
              width={100}
              height={100}
            />{" "}
            <span className="absolute -top-4 -right-4 bg-black aspect-square w-8 rounded-full text-white flex items-center justify-center">
              {product.quantity}
            </span>
          </Link>
        ))}
      </div>
      <ul className="flex flex-col gap-5 mt-10">
        <li className="flex justify-between items-center gap-8">
          <p className="text-sm font-semibold text-[#6C7275]">Order code</p>
          <p className="text-sm text-black font-semibold">{orderDetail?._id}</p>
        </li>
        <li className="flex justify-between items-center gap-8">
          <p className="text-sm font-semibold text-[#6C7275]">Date</p>
          <p className="text-sm text-black font-semibold">
            {/* convert date from ISO string to human readable */}
            {new Date(orderDetail?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </li>

        <li className="flex justify-between items-center gap-8">
          <p className="text-sm font-semibold text-[#6C7275]">subtotal</p>
          <p className="text-sm text-black font-semibold">
            ${orderDetail?.pricing.subTotal}
          </p>
        </li>
        <li className="flex justify-between items-center gap-8">
          <p className="text-sm font-semibold text-[#6C7275]">
            Shipping method
          </p>
          <p className="text-sm text-black font-semibold">
            {orderDetail?.shippingMethod.name}
          </p>
        </li>
        <li className="flex justify-between items-center gap-8">
          <p className="text-sm font-semibold text-[#6C7275]">Shipping cost</p>
          <p className="text-sm text-black font-semibold">
            {orderDetail?.shippingMethod.cost === 0
              ? "Free"
              : `$${orderDetail?.shippingMethod.cost}`}
          </p>
        </li>
        {!!orderDetail?.coupon && (
          <li className="flex justify-between items-center gap-8">
            <p className="text-sm font-semibold text-[#6C7275]">coupon</p>
            <p className="text-sm text-black font-semibold">
              {orderDetail?.coupon.code} - {orderDetail?.pricing.discount}%
            </p>
          </li>
        )}
        <li className="flex justify-between items-center gap-8">
          <p className="text-sm font-semibold text-[#6C7275]">Total</p>
          <p className="text-sm text-black font-semibold">
            ${orderDetail?.pricing.total}
          </p>
        </li>
      </ul>
      <Link href={"/shop"}>
        <Button className="mt-10 flex items-center gap-2">
          continue shopping <FaArrowRight />
        </Button>
      </Link>
    </div>
  );
};

export default CompleteOrderCard;
