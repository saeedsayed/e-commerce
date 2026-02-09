"use client";
import { Button, Spinner } from "@/components/common";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import { useState } from "react";
import CardBody from "./CardBody";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ContactInformationForm from "./ContactInformationForm";
import ShippingAddressForm from "./ShippingAddressForm";
import { useCartContext } from "@/context/CartContext";
import { checkoutFormSchema } from "@/utils/schemes";

type Props = {
  clientSecret: string;
  orderId: string;
};

const CheckoutForm = ({ clientSecret, orderId }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkoutFormSchema),
  });
  const { totalCartPrice, selectedShippingMethod } = useCartContext();
  const handleError = (error: StripeError) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const onSubmit = async (event: any) => {
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // set client secret and buyer info and shipping method in local storage
    // localStorage.setItem("client_secret", clientSecret);
    localStorage.setItem("buyerInfo", JSON.stringify(event));
    localStorage.setItem("shipping_method", selectedShippingMethod.name);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return to checkout page after payment is successful
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart/checkout/complete?order_id=${orderId}`,
      },
    });
    if (error) {
      handleError(error);
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <CardBody>
          <ContactInformationForm register={register} errors={errors} />
        </CardBody>
        <CardBody>
          <ShippingAddressForm register={register} errors={errors} />
        </CardBody>
        <CardBody>
          <PaymentElement />
        </CardBody>
        <Button
          className="w-full flex justify-center items-center"
          disabled={!stripe || loading}
        >
          <span className="pe-5">
            {!stripe || (loading && <Spinner size="6" />)}
          </span>
          Place order
        </Button>
        {errorMessage && (
          <div className="text-red-500 font-bold">{errorMessage}</div>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
