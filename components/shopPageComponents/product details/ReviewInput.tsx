"use client";

import { Spinner } from "@/components/common";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/lib/axios";
import { IReviews } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiStar } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";

type Props = { productId: string; reviewList: IReviews[] };

const ReviewInput = ({ productId, reviewList }: Props) => {
  const [rate, setRate] = useState({ rating: 0, comment: "" });
  const router = useRouter();
  const { user,status } = useAuthContext();
  const alreadyReviewed = reviewList?.find(
    (review) => review.user._id === user?._id,
  );
  const {
    isPending,
    isSuccess,
    mutate: addReview,
  } = useMutation({
    mutationFn: async () => {
      if (rate.rating === 0) {
        throw new Error(
          "Please provide a rating before submitting your review.",
        );
      }
      if (alreadyReviewed) {
        throw new Error("You have already reviewed this product.");
      }
      if(status !== "authenticated"){
        router.push("/login");
        throw new Error("You must be logged in to submit a review.");
      }
      const { data } = await axiosInstance.post<{ data: IReviews }>(
        `review/${productId}`,
        {
          rating: rate.rating,
          comment: rate.comment,
        },
      );
      return data;
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to submit review.",
      );
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      setRate({ rating: 0, comment: "" });
      router.refresh();
    },
  });
  return (
    <div className="relative mb-6">
      <textarea
        placeholder={
          alreadyReviewed
            ? "You have already reviewed this product."
            : "Write your review here..."
        }
        value={rate.comment}
        onChange={(e) => setRate({ ...rate, comment: e.target.value })}
        disabled={alreadyReviewed ? true : false || isPending}
        className="block w-full py-2 ps-2 pe-44 border rounded-md min-h-28 "
      />
      <div className="absolute bottom-2 right-2 flex flex-col items-end gap-2">
        {/* star rate */}
        <div className="flex items-center mb-2">
          {[...Array(rate.rating)].map((_, i) => (
            <span
              key={i}
              className="text-yellow-500 text-3xl cursor-pointer"
              onClick={() => setRate({ ...rate, rating: i + 1 })}
            >
              <FaStar />
            </span>
          ))}
          {[...Array(5 - rate.rating)].map((_, i) => (
            <span
              key={i}
              className="text-gray-300 text-3xl cursor-pointer"
              onClick={() => setRate({ ...rate, rating: rate.rating + i + 1 })}
            >
              <BiStar />
            </span>
          ))}
        </div>
        <button
          className="px-4 py-2 bg-black text-white rounded-md right-2 bottom-2 disabled:opacity-50"
          disabled={alreadyReviewed ? true : false || isPending}
          onClick={() => addReview()}
        >
          {isPending ? (
            <span className=" flex items-center gap-2">
              Submitting... <Spinner size="4" />
            </span>
          ) : isSuccess ? (
            "Submitted"
          ) : (
            "Leave Review"
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewInput;
