"use client";
import { Spinner } from "@/components/common";
import { axiosInstance } from "@/lib/axios";
import { IAddress } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

interface Props {
  address: IAddress;
}

const AddressCard = ({ address }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="border border-sub-text px-6 py-4 rounded-lg">
        <div className="flex mb-2">
          <h3 className="font-semibold">{address.title}</h3>
          {address.isDefault && (
            <span className="text-gray-400 text-sm">(default)</span>
          )}
          <button
            className="flex items-center ms-auto text-red-700 hover:text-red-800 transition-colors"
            onClick={handleOpenDeleteModal}
          >
            <FaTrash className="me-2" /> Delete
          </button>
        </div>
        <p className="text-sm mb-1">{address.city}</p>
        <p className="text-sm mb-1">{address.phone}</p>
        <p className="text-sm">
          {address.street}, {address.city}, {address.state}, {address.country}
        </p>
      </div>

      <DeleteAddressModal
        addressId={address._id}
        addressTitle={address.title}
        isOpen={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
      />
    </>
  );
};

export default AddressCard;

type IModalProps = {
  addressId: string;
  addressTitle: string;
  isOpen: boolean;
  handleClose: () => void;
};

const DeleteAddressModal = ({
  addressId,
  addressTitle,
  isOpen,
  handleClose,
}: IModalProps) => {
  const router = useRouter();
  const { mutate: deleteAddress, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.delete<{ message: string }>(
        `/addresses/${addressId}`,
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Address deleted successfully!");
      router.refresh();
      handleClose();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to delete address. Try again.";
      toast.error(errorMessage);
      console.error("Delete address error:", error);
    },
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-sm w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-sub-text">
            <h2 className="text-lg font-semibold text-text">Delete Address</h2>
            <button
              onClick={handleClose}
              className="text-sub-text hover:text-text transition-colors"
              aria-label="Close modal"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <p className="text-text mb-2">
              Are you sure you want to delete this address?
            </p>
            <p className="text-sub-text text-sm mb-4">
              Address:{" "}
              <span className="font-semibold text-text">{addressTitle}</span>
            </p>
            <p className="text-sub-text text-sm">
              This action cannot be undone.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 p-6 border-t border-sub-text bg-gray-50">
            <button
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 px-4 py-2 border border-sub-text text-text rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={(_) => deleteAddress()}
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed font-medium"
            >
              {isPending ? <Spinner size="6" /> : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
