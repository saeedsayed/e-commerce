"use client";
import Link from "next/link";
import Input from "./Input";
import { Button, Spinner } from "../common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/utils/schemes";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type formFields = {
  email: string;
};

const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      try {
        const { data } = await axiosInstance.post<{ message: string }>(
          "/auth/forgot-password",
          {
            email,
          }
        );
        return data.message;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
    },
    onSuccess: (message) => {
      router.push("/forgot-password/verify-otp");
      toast.success(message);
      localStorage.setItem("forgottenEmail", getValues("email"));
    },
    onError: (error: any) => {
      toast.error(error.message || "failed to send OTP to email");
    },
  });

  const onSubmit = async (data: formFields) => {
    mutate(data);
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
          placeholder="Your Email address"
          id="email"
          err={!!errors.email}
          errMes={errors.email?.message}
          register={register}
        />
        {isError && (
          <p className="text-red-500 mt-2 select-none">
            {error?.message || "fail to login"}
          </p>
        )}
        <Button className="w-full flex items-center justify-center gap-2">
          Send OTP {isPending ? <Spinner size="5" /> : ""}
        </Button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
