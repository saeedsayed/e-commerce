"use client";
import { useCartContext } from "@/context/CartContext";
import React, { useEffect, useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { Spinner } from "../common";

type Props = {};

const CouponInput = (props: Props) => {
  const {
    applyCoupon,
    removeCoupon,
    applyingCoupon,
    couponError,
    cartIsLoading,
    coupon,
  } = useCartContext();
  const [code, setCode] = useState<string>("");
  useEffect(() => {
    if (coupon) {
      setCode(coupon.coupon);
    }else{
      setCode('')
    }
  }, [coupon]);
  return (
    <div className="max-w-full">
      <h4 className="text-xl font-semibold">Have a coupon?</h4>
      <p className="text-sub-text py-3">
        Add your code for an instant cart discount
      </p>
      <div
        className={`inline-flex items-center border ${
          couponError ? "border-red-500" : "border-sub-text "
        } py-3 px-4 max-w-full`}
      >
        <span className="text-sub-text">
          <CiDiscount1 />
        </span>
        <input
          type="text"
          placeholder="Coupon code"
          className="border-none focus:outline-none min-w-12"
          onChange={(e) => setCode(e.target.value as string)}
          value={code}
          disabled={cartIsLoading}
        />
        {!!coupon ? (
          <button
            className="bg-transparent ms-2 text-red-500"
            onClick={removeCoupon}
            disabled={cartIsLoading}
          >
            remove
          </button>
        ) : (
          <button
            className="bg-transparent ms-2"
            onClick={(_) => applyCoupon(code)}
            disabled={cartIsLoading}
          >
            {applyingCoupon ? <Spinner size="4" /> : "Apply"}
          </button>
        )}
      </div>
      {couponError && <p className="text-red-500 mt-3 -mb-9">{couponError?.message}</p>}
    </div>
  );
};

export default CouponInput;
