import { discountCalc } from "@/lib/discountCalc";
import { ProductElement } from "@/types/cart.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { Counter, Spinner } from "../common";
import { useCartContext } from "@/context/CartContext";

interface Props {
  data: ProductElement;
}

const CartItem = ({ data }: Props) => {
  const { quantity, product } = data;
  const { removeFromCart, cartStatus, addToCart } = useCartContext();
  const imgSrc = product.thumbnail;
  const productName = product.title;
  const productPrice = product.price;
  return (
    <li>
      <Link href={`/shop/${product._id}`} className="py-3 flex border-b">
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
          <Counter
            initialValue={quantity}
            onChange={(newQuantity) => addToCart(product._id, newQuantity)}
            min={1}
            max={product.stock}
          />
        </div>
        <div className="ms-auto text-end">
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
            {cartStatus === "updating" ? <Spinner size="4" /> : <IoMdClose />}
          </button>
        </div>
      </Link>
    </li>
  );
};

export default CartItem;
