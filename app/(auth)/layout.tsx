// import { auth } from "@/auth";
import { ButtonProvider } from "@/components/authFormComponents";
import { Logo } from "@/components/common";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  // const session = await auth();
  // if (!!session?.user) {
  //   redirect("/");
  // }
  return (
    <div
      className="sm:h-screen sm:overflow-hidden h-fit absolute inset-0 z-50
      bg-white flex gap-y-6 flex-col sm:flex-row"
    >
      {/* <div className="gap-y-6 flex flex-col sm:flex-row overflow-auto h-full"> */}
      <div className="sm:w-1/2 w-full sm:h-full bg-primary">
        <h1 className="text-center text-2xl font-semibold my-8 ps-5">
          <Logo />
        </h1>
        <div className="relative sm:h-4/5 hidden sm:block h-0">
          <Image
            src="/images/auth_banner.png"
            className="object-contain"
            alt="logo"
            fill
          />
        </div>
      </div>
      <div className="sm:w-1/2 w-full sm:h-screen sm:overflow-auto grid place-items-center pb-6">
        <div className="w-10/12 lg:w-8/12d">
          {children}
          {/* <div className="flex items-center gap-3">
            <span className="h-[1px] flex-1 bg-gray-600" />
            <span>or</span>
            <span className="h-[1px] flex-1 bg-gray-600" />
          </div> */}
          {/* <ButtonProvider provider="google" /> */}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default layout;
