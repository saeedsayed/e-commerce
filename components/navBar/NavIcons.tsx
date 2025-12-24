"use client";
import React, { useState } from "react";
// icons
import { CiSearch } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { PiShoppingBagLight } from "react-icons/pi";
import Link from "next/link";
import FlyoutCart from "../flyoutCart/FlyoutCart";
import { Button, Dots, Spinner } from "../common";
import { useCartContext } from "@/context/CartContext";
import { useAuthContext } from "@/context/AuthContext";
import { useWishlistContext } from "@/context/WishlistContext";
import { FaRegHeart } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";

const NavIcons = () => {
  const { cart, cartStatus } = useCartContext();
  const { wishlist, isLoadingWishlist } = useWishlistContext();
  const cartItemCount = cart?.length;
  const wishlistItemCount = wishlist?.length;
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const handleCartOpen = () => {
    setCartIsOpen((p) => !p);
  };
  const { status } = useAuthContext();
  return (
    <div className="flex items-center gap-4">
      <a href="">
        <CiSearch className="w-6 h-6" />
      </a>
      {status === "loading" && <Dots />}
      {status === "authenticated" && (
        <Link href={"/profile"}>
          <BsPerson className="w-6 h-6" />
        </Link>
      )}
      {status === "unauthenticated" && (
        <Link href={"/login"}>
          <Button className="py-1 px-1 text-sm">sign in</Button>
        </Link>
      )}
      {status === "authenticated" && (
        <>
          <Link
            href={"/profile/wishlist"}
            className="flex items-center gap-[5px] cursor-pointer"
          >
            <FaRegHeart className="w-6 h-6" />
            {isLoadingWishlist ? (
              <div className="relative w-5 h-5">
                <Spinner size="4" />
              </div>
            ) : (
              <span className="flex items-center justify-center text-xs font-bold text-white w-5 h-5 bg-text rounded-full">
                {wishlistItemCount}
              </span>
            )}
          </Link>

          <div
            className="flex items-center gap-[1px] cursor-pointer"
            onClick={handleCartOpen}
          >
            <FiShoppingBag className="w-6 h-6" />
            {cartStatus === "loading" ? (
              <div className="relative w-5 h-5">
                <Spinner size="4" />
              </div>
            ) : (
              <span className="flex items-center justify-center text-xs font-bold text-white w-5 h-5 bg-text rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>
        </>
      )}
      <FlyoutCart isOpen={cartIsOpen} handleClose={handleCartOpen} />
    </div>
  );
};

export default NavIcons;
