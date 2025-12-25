"use client";
import React from "react";
import { Button } from "../common";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";

type Props = {};

const CartSummary = (props: Props) => {
  const {
    cart,
    shippingMethods,
    selectedShippingMethod,
    setSelectedShippingMethod,
    totalCartPrice,
  } = useCartContext();
  return (
    <div className="p-6 border rounded-md border-sub-text sticky top-0">
      <h4 className="mb-4 text-xl">Cart Summary</h4>
      <div className="flex flex-col gap-4 mb-4">
        {shippingMethods.map((item) => (
          <label
            key={item._id}
            htmlFor={item.name}
            className={`py-3 px-4 border border-[#141718] rounded-md cursor-pointer
                            flex justify-between ${
                              item.name === selectedShippingMethod?.name
                                ? "bg-[#F3F5F7]"
                                : ""
                            }`}
          >
            <div>
              <input
                type="radio"
                checked={item.name === selectedShippingMethod?.name}
                name="shippingMethod"
                id={item.name}
                onChange={() => setSelectedShippingMethod(item)}
              />
              <span className="ml-4">{item.name}</span>
            </div>
            <span>${item.cost}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between border-b py-3">
        <p className="">Subtotal</p>
        <p className="">${totalCartPrice}</p>
      </div>
      <div className="flex justify-between py-3">
        <p className="text-xl font-bold">Total</p>
        <p className="text-xl font-bold">${totalCartPrice + (selectedShippingMethod?.cost || 0)}</p>
      </div>
      <Link href={"/cart/checkout"}>
        <Button className="w-full mt-10">Checkout</Button>
      </Link>
    </div>
  );
};

export default CartSummary;
