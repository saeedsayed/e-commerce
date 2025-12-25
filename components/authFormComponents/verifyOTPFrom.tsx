"use client";
import Link from "next/link";
import Input from "./Input";
import { Button, Spinner } from "../common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOTPFormSchema } from "@/utils/schemes";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type formFields = {
  otp: string;
};

const VerifyOTPForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(verifyOTPFormSchema) });
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: async ({ otp, email }: { otp: string; email: string }) => {
      try {
        const { data } = await axiosInstance.post<{ message: string }>(
          "/auth/forgot-password/verify-otp",
          {
            otp,
            email,
          }
        );
        return data.message;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "failed to verify OTP");
      }
    },
    onSuccess: (message) => {
      router.push("/forgot-password/reset-password");
      toast.success(message);
      localStorage.setItem("isOTPVerified", "true");
    },
    onError: (error: any) => {
      toast.error(error.message || "failed to verify OTP");
    },
  });

  const onSubmit = async (data: formFields) => {
    const forgottenEmail = localStorage.getItem("forgottenEmail");
    if (!forgottenEmail) {
      toast.error("No email found. Please try again.");
      router.push("/forgot-password");
      return;
    }
    mutate({ ...data, email: forgottenEmail });
  };
  return (
    <>
      <h1 className="text-4xl font-semibold mb-6">Forgot password</h1>
      <p className="text-sub-text mb-8">
        Did you remember the password?
        <Link href="/login" className="text-badge">
          {" "}
          Login
        </Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Your OTP"
          id="otp"
          err={!!errors.otp}
          errMes={errors.otp?.message}
          register={register}
        />
        {isError && (
          <p className="text-red-500 mt-2 select-none">
            {error?.message || "fail to login"}
          </p>
        )}
        <Button className="w-full flex items-center justify-center gap-2">
          Verify OTP {isPending ? <Spinner size="5" /> : ""}
        </Button>
      </form>
    </>
  );
};

export default VerifyOTPForm;
