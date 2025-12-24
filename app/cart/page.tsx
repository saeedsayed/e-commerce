"use client";
import {
  CartSummary,
  CartTable,
  CouponInput,
  SmallDevicesCartTable,
  EmptyCart,
} from "@/components/cartPageComponents";
import { CartPageSk } from "@/components/common/loaders/skeletons";
import { useCartContext } from "@/context/CartContext";

const page = () => {
  const { cartStatus } = useCartContext();
  return (
    <>
      {cartStatus === "loading" && <CartPageSk />}
      {cartStatus === "empty" && <EmptyCart />}
      {(cartStatus === "done" || cartStatus === "updating") && (
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="md:w-7/12 lg:w-8/12">
            <CartTable />
            <SmallDevicesCartTable />
            <CouponInput />
          </div>
          <div className="flex-1">
            <CartSummary />
          </div>
        </div>
      )}
    </>
  );
};

export default page;
