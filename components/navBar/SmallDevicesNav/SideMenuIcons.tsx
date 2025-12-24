"use client";
import React from "react";
// icons
import { PiShoppingBagLight } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import Link from "next/link";
import { IconType } from "react-icons";
import { useCartContext } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishlistContext";
import { useAuthContext } from "@/context/AuthContext";

type ItemProps = {
  text: string;
  path: string;
  icon: IconType;
  label?: number;
};

type Props = {
  handleClose: () => void;
};

const SideMenuIcons = ({handleClose}: Props) => {
  const { status } = useAuthContext();
  const {cart}=useCartContext()
  const {wishlist}=useWishlistContext()
  return (
    <div className="flex flex-col gap-2 text-sub-text" onClick={handleClose}>
      <Item text="Cart" icon={PiShoppingBagLight} path="/cart" label={cart.length} />
      <Item text="Wishlist" icon={CiHeart} path="/profile/wishlist" label={wishlist?.length} />
      {status === "authenticated" && (
        <Item text="Profile" icon={BsPerson} path="/profile" />
      )}
    </div>
  );
};

const Item = ({ icon: Icon, text, path, label }: ItemProps) => {
  return (
    <Link
      href={path}
      className="flex justify-between pb-2 border-b border-b-[#E8ECEF]"
    >
      <p>{text}</p>
      <div className="flex items-center gap-[5px]">
        <Icon className="w-6 h-6" />
        {!!label ? (
          <span className="flex items-center justify-center text-xs text-white w-5 h-5 bg-text rounded-full">
            {label}
          </span>
        ) : (
          <span className="w-5" />
        )}
      </div>
    </Link>
  );
};

export default SideMenuIcons;
