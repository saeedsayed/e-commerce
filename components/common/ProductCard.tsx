"use client";
import { IProduct } from "@/types";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Button from "./Button";
import { FaRegHeart } from "react-icons/fa";
import { discountCalc } from "@/lib/discountCalc";
import Link from "next/link";
import { useWishlistContext } from "@/context/WishlistContext";
import { useCartContext } from "@/context/CartContext";
type Props = {
  data: IProduct;
};

const ProductCard = ({ data }: Props) => {
  const product = data;
  const { wishlist, handleWishlist, wishlistStatus } = useWishlistContext();
  const { addToCart, cartStatus } = useCartContext();
  const isFavorite = true;
  // const isFavorite = wishlist.find((item) => item._id === data._id);
  const isNew =
    new Date(product.createdAt) >=
    new Date(new Date().setDate(new Date().getDate() - 14));
  return (
    <Link
      href={`/shop/${data._id}?name=${product.title}`}
      className="select-none block [&:hover_button]:opacity-100"
    >
      <div className="bg-primary p-2 sm:p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 md:gap-2 items-center sm:flex-col">
            <div
              className={`bg-white text-sm sm:text-base px-1 sm:px-4 rounded-md mb-1 sm:mb-2 font-bold ${
                isNew ? "text-green-600" : "opacity-0"
              }`}
            >
              NEW
            </div>
            <div
              className={`bg-badge text-sm sm:text-base text-second-text px-1 sm:px-4 rounded-md font-bold ${
                !product.discount && "opacity-0"
              }`}
            >
              -
              {discountCalc(product.price, product.discount).discountPercentage}
              %
            </div>
          </div>
          <button
            className={`
              ${isFavorite ? "text-red-500" : "text-text"}
             cursor-pointer p-2 rounded-full aspect-square  shadow md:opacity-0 transition-all ${
               wishlistStatus === "loading" && "cursor-not-allowed"
             }`}
            onClick={(e) => {
              e.preventDefault();
              handleWishlist(data._id);
            }}
          >
            <FaRegHeart />
          </button>
        </div>
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-52">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="10000rem"
            className="object-contain "
          />
        </div>
        <Button
          className={`w-full mt-1 sm:mt-4 md:opacity-0 transition-all text-xs sm:text-lg ${
            cartStatus === "loading" && "cursor-not-allowed"
          }`}
          onClick={(e) => {
            e.preventDefault();
            // addToCart(data._id, 1, "any");
          }}
        >
          Add to cart
        </Button>
      </div>
      <div className="flex flex-col sm:gap-3 mt-3">
        <div className="flex">
          {[...Array(product.rating || 4)].map((e, i) => (
            <span className="text-yellow-500" key={i}>
              <FaStar />
            </span>
          ))}
        </div>
        <h3 className="font-semibold">{product.title}</h3>
        <p className="font-semibold">
          ${discountCalc(product.price, product.discount).newPrice}{" "}
          {product?.discount > 0 && (
            <span className="text-sub-text line-through ms-3">
              ${product.price}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
