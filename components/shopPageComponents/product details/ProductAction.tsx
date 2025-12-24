"use client";
import { Button, Spinner } from "@/components/common";
import { Counter } from "@/components/common";
import { useCartContext } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import React, { useState } from "react";
import { BiHeart } from "react-icons/bi";

type Props = {
  id: string;
  stock: number;
};

const ProductAction = ({ id, stock }: Props) => {
  const { addToCart, cartStatus } = useCartContext();
  const { wishlist, handleWishlist, isLoadingWishlist } = useWishlistContext();
  const [count, setCount] = useState<number>(1);
  const isFavorite = !!wishlist?.find((item) => item._id === id);
  const handleAddToCart = () => {
    addToCart(id, count);
  };

  return (
    <div className="py-8">
      <div className="flex gap-6 mb-4">
        <Counter min={1} max={stock} onChange={setCount} />
        <button
          type="button"
          onClick={() => {
            handleWishlist(id);
          }}
          className={`${
            isFavorite ? "bg-red-500 text-primary" : "bg-transparent"
          } border border-black rounded-lg text-lg text-black flex justify-center gap-2 items-center flex-1`}
        >
          {isLoadingWishlist ? <Spinner size="5" /> : <BiHeart />} wishlist{" "}
          {isFavorite ? "Added" : "Add"}
        </button>
      </div>
      <Button
        className="flex justify-center gap-3 w-full py-3"
        onClick={handleAddToCart}
      >
        Add to cart {cartStatus === "updating" && <Spinner size="5" />}
      </Button>
    </div>
  );
};

export default ProductAction;
