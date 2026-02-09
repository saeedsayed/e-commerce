"use client";
import { CheckoutForm, OrderSummary } from "@/components/cartPageComponents";
import { Spinner } from "@/components/common";
import { useAuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";
import { axiosInstance } from "@/lib/axios";
import getStripe from "@/utils/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const page = () => {
  const { cartIsLoading, coupon, selectedShippingMethod } = useCartContext();
  const { data, isLoading } = useQuery({
    queryKey: ["clientSecret"],
    queryFn: async () => {
      const { data } = await axiosInstance.post<{
        data: {
          clientSecret: string;
          orderId: string;
          total: number;
          subTotal: number;
          shipping: number;
          discount: number;
        };
      }>("/payment/create-payment-intent", {
        couponCode: coupon ? coupon.coupon : undefined,
        shippingMethodId: selectedShippingMethod._id,
      });
      return data.data;
    },
  });
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      )}
      {!cartIsLoading && !isLoading && data?.clientSecret && (
        <Elements
          stripe={getStripe()}
          options={{ clientSecret: data?.clientSecret || "" }}
        >
          <div className="flex flex-col md:flex-row items-start gap-16">
            <div className="flex-1">
              <CheckoutForm clientSecret={data?.clientSecret || ""} orderId={data?.orderId || ""} />
            </div>
            <div className="flex-1 max-w-[443px] mx-auto sticky top-20">
              <OrderSummary bill={data} />
            </div>
          </div>
        </Elements>
      )}
    </>
  );
};

export default page;
