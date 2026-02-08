import React from "react";
import CardBody from "./CardBody";
import CartItem from "@/components/flyoutCart/CartItem";
import { Button, Input } from "@/components/common";
import { useCartContext } from "@/context/CartContext";

type Props = {
  bill: {
    total: number;
    subTotal: number;
    shipping: number;
    discount: number;
  };
};

const OrderSummary = ({ bill }: Props) => {
  const { cart, totalCartPrice, selectedShippingMethod, coupon } =
    useCartContext();
  return (
    <CardBody>
      <h3 className="text-2xl font-medium mb-4">Order Summary</h3>
      <ul>
        {cart.map((item) => (
          <CartItem key={item.product._id} data={item} />
        ))}
      </ul>
      {/* <div className="flex items-center my-5 gap-3">
        <Input id="coupon" placeholder="Coupon" type="text" />
        <Button>Apply</Button>
      </div> */}
      <p className="text-lg flex justify-between py-3 border-b">
        Shipping <span>${bill.shipping}</span>
      </p>
      {!!bill.discount && (
        <p className="text-lg flex justify-between py-3 border-b text-green-500">
          Coupon <span>-${bill.discount}</span>
        </p>
      )}
      <p className="text-lg flex justify-between py-3 border-b">
        Subtotal: <span>${bill.subTotal}</span>
      </p>
      <p className="text-xl font-semibold flex justify-between pt-3">
        Total: <span>${bill.total}</span>
      </p>
    </CardBody>
  );
};

export default OrderSummary;
