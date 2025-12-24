import { ProductElement } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Counter } from "../common";
import { discountCalc } from "@/lib/discountCalc";
import { IoMdClose } from "react-icons/io";
import { useCartContext } from "@/context/CartContext";

type Props = {
  data: ProductElement;
};

const CartItem = ({ data }: Props) => {
  const { quantity, product } = data;
  const { removeFromCart, cartStatus, addToCart } = useCartContext();
  const imgSrc = product.thumbnail;
  const productName = product.title;
  const productPrice = product.price;
  return (
    <Link
      href={`/shop/${product._id}`}
      className="flex py-3 md:py-0 border-b md:border-b-0"
    >
      <Image
        width={80}
        height={80}
        src={imgSrc}
        alt={productName}
        className="me-4 object-contain"
      />
      <div className="flex items-start flex-col gap-2 w-48">
        <h3 className="font-semibold text-sm">{productName}</h3>
        <p className="text-xs text-sub-text">color: red</p>
        <div className="md:hidden block">
          <Counter
            initialValue={quantity}
            onChange={(newQuantity) => { addToCart(product._id, newQuantity) }}
            min={1}
            max={product.stock}
          />
        </div>
        <div className="md:block hidden">
          <button
            className={`flex items-center gap-2 ${
              cartStatus === "updating" ? "cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              removeFromCart(product._id);
            }}
          >
            <IoMdClose /> Remove
          </button>
        </div>
      </div>
      <div className="ms-auto text-end md:hidden block">
        <p className="font-semibold text-sm mb-2">
          ${discountCalc(productPrice, product.discount).newPrice}
        </p>
        <button
          className="w-[14px] h-[14px]"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            removeFromCart(product._id);
          }}
        >
          <IoMdClose />
        </button>
      </div>
    </Link>
  );
};

export default CartItem;
