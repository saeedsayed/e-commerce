"use client";
import React, { useEffect } from "react";
import { profileFormSchema } from "@/utils/schemes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@/components/common";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";

const AccountDetailsForm = () => {
  const { updateUser, user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.fullName.split(" ")[0] || "",
      lastName: user?.fullName.split(" ")[1] || "",
    },
  });
  // handle submit change
  const onSubmit = async (data: { firstName: string; lastName: string }) => {
    // console.log("data", data);
    if (
      data.firstName.trim() === user?.fullName.split(" ")[0] &&
      data.lastName.trim() === user?.fullName.split(" ")[1]
    ) {
      toast.error("Nothing to update");
      return;
    }
    const toastId = toast.loading("Updating...");
    // api call
    // const [err, res] = await putApi(`accounts/${user?._id}`, {
    //   data,
    // });

    // if (err) {
    //   toast.remove(toastId);
    //   toast.error("Something went wrong");
    //   return;
    // }
    // update session
    updateUser(user);
    toast.remove(toastId);
    toast.success("Updated successfully");
  };
    useEffect(() => {
      setValue("firstName", user?.fullName.split(" ")[0] || "");
      setValue("lastName", user?.fullName.split(" ")[1] || "");
    }, [user]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <Input
            label="First Name"
            id="firstName"
            required
            register={register}
            err={!!errors.firstName}
            errMes={errors?.firstName?.message as string}
          />
          <Input
            label="Last Name"
            id="lastName"
            required
            register={register}
            err={!!errors.lastName}
            errMes={errors?.lastName?.message as string}
          />
          <Input
            label="Email"
            id="email"
            required
            disabled
            defaultValue={user?.email}
          />
        </div>
        <h3 className="mt-10 mb-6 font-inter font-semibold text-xl">
          Password
        </h3>
        <div className="flex flex-col gap-6">
          <Input
            label="Old Password"
            id="oldPassword"
            type="password"
            disabled
          />
          <Input label="Password" id="password" type="password" disabled />
          <Input
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            disabled
          />
        </div>
        <Button className="px-10 py-3 mt-6" type="submit">
          Save changes
        </Button>
      </form>
    </>
  );
};

export default AccountDetailsForm;
