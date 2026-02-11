"use client";
import { Button, Input, Spinner } from "@/components/common";
import { addressSchema } from "@/utils/schemes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { MdClose, MdLocationOn } from "react-icons/md";
import PagesTitle from "../PagesTitle";
import {
  ContactInformationForm,
  ShippingAddressForm,
} from "@/components/cartPageComponents";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {};

type IFormData = Yup.InferType<typeof addressSchema>;

const CreateAddress = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormData>({
    resolver: yupResolver(addressSchema),
  });
  const createAddress = async (addressData: IFormData) => {
    //create a new address via api call
    const { data } = await axiosInstance.post<{ message: string }>(
      "/addresses",
      {
        ...addressData,
        fullName: addressData.firstName + " " + addressData.lastName,
      },
    );
    return data;
  };
  const { mutate, isPending } = useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      toast.success(data.message);
      router.refresh();
      setIsOpen(false);
      reset();
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  useEffect(() => {
    reset(); //reset the form values when close modal
    if (isOpen && user) {
      // set some fields based on the user information
      setValue("email", user?.email);
      setValue("firstName", user?.fullName.split(" ")[0]);
      setValue("lastName", user?.fullName.split(" ")[1]);
    }
  }, [isOpen]);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex flex-col justify-center items-center border-2 border-dashed border-blue-50 px-6 py-4 rounded-lg hover:border-solid hover:bg-blue-50 group active:scale-95 transition-all duration-75"
      >
        <div className="bg-primary text-white p-4 rounded-full mb-2 group-hover:scale-110 transition-transform">
          <FaPlus className="text-2xl" />
        </div>
        <p className="text-text font-semibold text-sm">Add New Address</p>
        <p className="text-sub-text text-xs">
          Click to add a new shipping address
        </p>
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden max-h-[calc(100vh-80px)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-sub-text bg-gradient-to-r from-blue-50 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MdLocationOn className="text-primary" size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text">
                      Add New Address
                    </h2>
                    <p className="text-xs text-sub-text">
                      Enter your shipping details
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sub-text hover:text-text transition-colors"
                  aria-label="Close modal"
                >
                  <MdClose size={24} />
                </button>
              </div>

              {/* Modal Body - Scrollable Form */}
              <form
                onSubmit={handleSubmit(mutate as any)}
                className="overflow-y-auto flex-1 p-6 space-y-4"
              >
                <Input
                  register={register}
                  id="title"
                  label="Address Title"
                  err={!!errors?.title}
                  errMes={errors?.title?.message}
                  placeholder="e.g., Home, Work, Apartment"
                  // className="text-sm"
                />
                <div className="space-y-4">
                  {/* <h3 className="text-sm font-semibold text-text">
                    Contact Information
                  </h3> */}
                  <ContactInformationForm register={register} errors={errors} />
                </div>
                <div className="space-y-4">
                  {/* <h3 className="text-sm font-semibold text-text">
                    Shipping Address
                  </h3> */}
                  <ShippingAddressForm register={register} errors={errors} />
                </div>
                <label
                  htmlFor="isDefault"
                  className="flex gap-3 items-center pt-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="isDefault"
                    {...register("isDefault")}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-sm text-text font-medium">
                    Make this my default address
                  </span>
                </label>
              </form>

              {/* Modal Footer */}
              <div className="flex gap-3 p-6 border-t border-sub-text bg-gray-50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 border border-sub-text text-text rounded-md hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit(mutate as any)}
                  disabled={isPending}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      Adding <Spinner size="4" />
                    </>
                  ) : (
                    "Add Address"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateAddress;
