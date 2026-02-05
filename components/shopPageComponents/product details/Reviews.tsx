"use client";
import RatingStars from "@/components/common/RatingStars";
import { IReviews } from "@/types";
import ReviewInput from "./ReviewInput";
import { useAuthContext } from "@/context/AuthContext";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/common";
import { useState } from "react";

type Props = { productId: string; ratingAVG: number; reviews: IReviews[] };
const Reviews = ({ productId, ratingAVG, reviews }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user } = useAuthContext();
  const myReviews = reviews.find((review) => review.user._id === user?._id);

  return (
    <div>
      <h2 className="text-2xl font-bold">Customer Reviews</h2>
      <div className="flex-1 mt-6 mb-8">
        <div className="flex gap-[10px] items-center">
          <RatingStars rating={ratingAVG || 0} />

          <p className="text-xs">{reviews?.length || 0} Reviews</p>
        </div>
      </div>
      <ReviewInput productId={productId} reviewList={reviews} />
      {reviews.length === 0 ? (
        <p className="text-gray-600 text-xl">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <ul className="space-y-4">
          {myReviews && (
            <li className="border-b pb-4 flex items-start gap-10 mb-2">
              <img
                src={myReviews.user.avatar}
                alt={myReviews.user.fullName}
                className="w-16 aspect-square rounded-full mr-2"
              />
              <div className="space-y-2">
                <span className="font-medium">{myReviews.user.fullName}</span>
                <RatingStars rating={myReviews.rating} />
                <p className="text-gray-600">{myReviews.comment}</p>
              </div>
              <div className="ms-auto self-center flex items-center">
                <button
                  title="edit review"
                  disabled
                  className="opacity-50 cursor-not-allowed text-blue-500 hover:text-blue-700 text-3xl w-14 h-12 flex justify-center items-center border rounded-s-xl"
                >
                  <FaPencilAlt />
                </button>
                <button
                  title="delete review"
                  className="text-red-500 hover:text-red-700 text-3xl w-14 h-12 flex justify-center items-center border rounded-e-xl"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          )}
          {reviews.map(
            (review) =>
              review._id !== myReviews?._id && (
                <li
                  key={review._id}
                  className="border-b pb-4 flex items-start gap-10 mb-2"
                >
                  <img
                    src={review.user.avatar}
                    alt={review.user.fullName}
                    className="w-16 aspect-square rounded-full mr-2"
                  />
                  <div className="space-y-2">
                    <span className="font-medium">{review.user.fullName}</span>
                    <RatingStars rating={review.rating} />
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </li>
              ),
          )}
        </ul>
      )}
      <DeleteReviewModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        reviewId={myReviews?._id || ""}
      />
    </div>
  );
};

export default Reviews;

function DeleteReviewModal({
  isOpen,
  onClose,
  reviewId,
}: {
  isOpen: boolean;
  onClose: () => void;
  reviewId: string;
}) {
  const router = useRouter();
  const { mutate: deleteReview, isPending } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`review/${reviewId}`);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete review.",
      );
    },
    onSuccess: () => {
      toast.success("Review deleted successfully!");
      router.refresh();
      onClose();
    },
  });
  if (!isOpen) return null;
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md max-w-md mx-auto mt-20">
        <h3 className="text-lg font-medium mb-4">Delete Review</h3>
        <p className="mb-4">Are you sure you want to delete this review?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md"
            onClick={() => deleteReview()}
            disabled={isPending}
          >
            {isPending ? <Spinner size="6" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
