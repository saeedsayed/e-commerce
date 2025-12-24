"use client";
import Link from "next/link";
import Input from "./Input";
import { Button, Spinner } from "../common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormSchema } from "@/utils/schemes";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { IUser } from "@/types";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  password: string;
  confirmPassword?: string;
  accept?: boolean;
};

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerFormSchema) });
  const { updateUser } = useAuthContext();
  const router = useRouter();
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        const res = await axiosInstance.post<{ data: IUser; token: string }>(
          "/auth/register",
          data
        );
        return res.data;
      } catch (error: any) {
        throw new Error(
          error?.response?.data?.message || "Registration failed"
        );
      }
    },
    onSuccess: (data) => {
      toast.success("Registration successful!");
      updateUser(data.data);
      setCookie("token", data.token, { maxAge: 7 * 24 * 60 * 60 }); // 7 days in seconds
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Registration failed");
    },
  });

  const onSubmit = async (data: FormData) => {
    const { email, firstName, lastName, password, confirmPassword } = data;
    const fullName = `${firstName} ${lastName}`;
    mutate({
      email,
      fullName,
      password,
      confirmPassword,
    });
  };
  return (
    <>
      <h1 className="text-4xl font-semibold mb-6">sign up</h1>
      <p className="text-sub-text mb-8">
        Already have an account?
        <Link href="/login" className="text-badge font-bold">
          {" "}
          Sign in
        </Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Your Email address"
          id="email"
          register={register}
          err={!!errors.email}
          errMes={errors.email?.message}
        />
        {/* first and last name */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Your first name"
            id="firstName"
            register={register}
            err={!!errors.firstName}
            errMes={errors.firstName?.message}
          />
          <Input
            placeholder="Your last name"
            id="lastName"
            register={register}
            err={!!errors.lastName}
            errMes={errors.lastName?.message}
          />
        </div>
        {/* password and confirm password */}
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
        {/* accept terms and conditions */}
        <label
          htmlFor="accept"
          className="text-sub-text text-xs sm:text-base flex items-center gap-3 cursor-pointer line-clamp-1"
        >
          <input
            type="checkbox"
            id="accept"
            className={`w-6 h-6`}
            {...register("accept")}
          />
          <span>
            I agree with{" "}
            <span className="text-black font-bold">Privacy Policy</span> and{" "}
            <span className="text-black font-bold">Terms of Use</span>
          </span>
        </label>
        {/* errors for accept */}
        {errors.accept && (
          <p className="text-red-500 text-xs mt-2 sm:text-base">
            {errors?.accept?.message}
          </p>
        )}
        {/* errors for registration */}
        {isError && <p className="text-red-500 mt-2">{error?.message}</p>}
        {/* sign up button */}
        <Button className="w-full mt-6 flex items-center justify-center gap-2">
          Sign up {isPending ? <Spinner size="5" /> : ""}
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
