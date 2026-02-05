"use client";
import { CheckoutForm, OrderSummary } from "@/components/cartPageComponents";
import { useCartContext } from "@/context/CartContext";
import getStripe from "@/utils/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { totalCartPrice, cartIsLoading } = useCartContext();
  const amount = totalCartPrice.total * 100;
  // if (!totalCartPrice.subTotal) {
  //   router.back();
  // }
  return (
    <>
      {!cartIsLoading && amount > 1 && (
        <Elements
          stripe={getStripe()}
          options={{ mode: "payment", amount, currency: "usd" }}
        >
          <div className="flex flex-col md:flex-row items-start gap-16">
            <div className="flex-1">
              <CheckoutForm />
            </div>
            <div className="flex-1 max-w-[443px] mx-auto sticky top-20">
              <OrderSummary />
            </div>
          </div>
        </Elements>
      )} 
      <p>Checkout Page</p>
    </>
  );
};

export default page;
