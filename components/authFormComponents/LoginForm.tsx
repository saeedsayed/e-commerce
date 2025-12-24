"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Input from "./Input";
import { Button, Spinner } from "../common";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "@/utils/schemes";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type formFields = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

const LoginForm = () => {
  const { updateUser } = useAuthContext();
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({ resolver: yupResolver(loginFormSchema) });
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        const response = await axiosInstance.post("/auth/login", {
          email: email,
          password: password,
        });
        return response.data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
    },
    onSuccess: (data) => {
      toast.success("Login successful");
      updateUser(data.data);
      setCookie("token", data.token, {
        maxAge: getValues("rememberMe") ? 7 * 24 * 60 * 60 : undefined,
      }); // 7 days in seconds
      router.push("/")
    },
    onError: (error: any) => {
      toast.error(error.message || "Login failed");
    },
  });

  const onSubmit = async (data: formFields) => {
    const { email, password } = data;
    mutate({ email, password });
  };
  return (
    <>
      <h1 className="text-4xl font-semibold mb-6">sign in</h1>
      <p className="text-sub-text mb-8">
        Don't have an account yet?
        <Link href="/register" className="text-badge">
          {" "}
          Register
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
        <Input
          type="password"
          placeholder="Password"
          id="password"
          err={!!errors.password}
          errMes={errors.password?.message}
          register={register}
        />
        <div className="flex justify-between">
          <label
            htmlFor="rememberMe"
            className="text-sub-text flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
              className="w-6 h-6"
            />
            Remember me
          </label>
          <p className="font-bold cursor-not-allowed">Forgot Password?</p>
        </div>
        {isError && (
          <p className="text-red-500 mt-2 select-none">
            {error?.message || "fail to login"}
          </p>
        )}
        <Button className="w-full mt-6 flex items-center justify-center gap-2">
          Sign in {isPending ? <Spinner size="5" /> : ""}
        </Button>
      </form>
      {/* <ButtonProvider provider="google" /> */}
    </>
  );
};

export default LoginForm;
