"use client";
import { WishlistItem } from "./";
import Link from "next/link";
import { Button } from "../common";
import { IoClose } from "react-icons/io5";
import { useWishlistContext } from "@/context/WishlistContext";
import { useCartContext } from "@/context/CartContext";

const SmallDevicesWishlistTable = () => {
  const { wishlist, isLoadingWishlist, handleWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();
  return (
    <>
      {!isLoadingWishlist && (
        <div className="md:hidden">
          <h5 className="pb-2 ps-12 text-sm text-sub-text border-b border-b-[#E8ECEF]">
            Product
          </h5>
          <div>
            {wishlist.map((item) => (
              <Link
                href={`/shop/${item._id}`}
                key={item._id}
                className="block border-b py-4"
              >
                <button
                  className="w-6 aspect-square"
                  onClick={(e) => {
                    e.preventDefault();
                    handleWishlist(item._id);
                  }}
                >
                  <IoClose />
                </button>
                <WishlistItem data={item} />
                <Button
                  className={"md:hidden w-full mt-4"}
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(item._id, 1);
                  }}
                >
                  Add to cart
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SmallDevicesWishlistTable;
