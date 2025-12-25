"use client";
import Link from "next/link";
import Input from "./Input";
import { Button, Spinner } from "../common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "@/utils/schemes";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type formFields = {
  password: string;
  confirmPassword?: string;
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({ resolver: yupResolver(resetPasswordSchema) });
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: async (reqBody: {
      newPassword: string;
      confirmNewPassword: string;
      email: string;
    }) => {
      try {
        const { data } = await axiosInstance.put<{ message: string }>(
          "auth/reset-password",
          reqBody
        );
        return data.message;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || "failed to reset password"
        );
      }
    },
    onSuccess: (message) => {
      router.push("/login");
      toast.success(message);
      localStorage.removeItem("isOTPVerified");
      localStorage.removeItem("forgottenEmail");
    },
    onError: (error: any) => {
      toast.error(error.message || "failed to reset password");
    },
  });

  const onSubmit = async (data: formFields) => {
    const forgottenEmail = localStorage.getItem("forgottenEmail");
    const isOTPVerified = localStorage.getItem("isOTPVerified");
    if (!forgottenEmail || !isOTPVerified) {
      toast.error("No email found. Please try again.");
      router.push("/forgot-password");
      return;
    }
    mutate({
      newPassword: data.password,
      confirmNewPassword: data.confirmPassword as string,
      email: forgottenEmail,
    });
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
          type="password"
          placeholder="Password"
          id="password"
          register={register}
          err={!!errors.password}
          errMes={errors.password?.message}
        />
        <Input
          type="password"
          placeholder="confirm password"
          id="confirmPassword"
          register={register}
          err={!!errors.confirmPassword}
          errMes={errors.confirmPassword?.message}
        />
        {isError && (
          <p className="text-red-500 mt-2 select-none">
            {error?.message || "fail to login"}
          </p>
        )}
        <Button className="w-full flex items-center justify-center gap-2">
          Reset Password {isPending ? <Spinner size="5" /> : ""}
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
