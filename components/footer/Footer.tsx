import React from "react";
import { Logo } from "../common";
import Link from "next/link";
import { MAIN_NAV_LINKS, SOCIAL_LINKS } from "@/constants";
const Footer = () => {
  return (
    <div className="bg-black text-[#E8ECEF] text-sm pt-10 sm:pt-20 pb-8">
      <div className="container">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-10 sm:gap-0">
          <div className="flex items-center justify-center flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="text-2xl font-medium">
              <Logo />
            </div>
            <div className="sm:border-l border-t w-6 sm:w-0 h-0 sm:h-6" />
            <p className="">Gift & Decoration Store.</p>
          </div>
          <nav className="flex gap-10 flex-col sm:flex-row items-center">
            {MAIN_NAV_LINKS.map((link) => (
              <Link key={link.name} href={link.path} className="hover:border-b">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        {/* bottom footer */}
        <div className="border-t pt-4 mt-10 sm:mt-12 flex gap-5 justify-center flex-wrap items-center flex-col-reverse sm:flex-row">
          <div>Copyright © 2023 E-shop. All rights reserved</div>
          <div className="flex-1">
            <Link href="" className="text-white font-semibold">
              Privacy Policy
            </Link>
            <Link href="" className="text-white font-semibold ms-4">
              Terms of Use
            </Link>
          </div>
          <div className="flex gap-7">
            {SOCIAL_LINKS.map(({ name, path, icon: Icon }) => (
              <a key={name} href={path} title={name}>
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
