import React from "react";
import CardBody from "./CardBody";
import CartItem from "@/components/flyoutCart/CartItem";
import { Button, Input } from "@/components/common";
import { useCartContext } from "@/context/CartContext";

const OrderSummary = () => {
  const { cart, totalCartPrice, selectedShippingMethod } = useCartContext();
  return (
    <CardBody>
      <h3 className="text-2xl font-medium mb-4">Order Summary</h3>
      <ul>
        {cart.map((item) => (
          <CartItem key={item.product._id} data={item} />
        ))}
      </ul>
      <div className="flex items-center my-5 gap-3">
        <Input id="coupon" placeholder="Coupon" type="text" />
        <Button>Apply</Button>
      </div>
      <p className="text-lg flex justify-between py-3 border-b">
        Shipping <span>${selectedShippingMethod.cost}</span>
      </p>
      <p className="text-lg flex justify-between py-3 border-b">
        Subtotal: <span>${totalCartPrice}</span>
      </p>
      <p className="text-xl font-semibold flex justify-between pt-3">
        Total: <span>${totalCartPrice + selectedShippingMethod.cost}</span>
      </p>
    </CardBody>
  );
};

export default OrderSummary;
