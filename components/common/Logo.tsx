"use client";

import Link from "next/link";

type props = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
};
const sizeScale: Record<Exclude<props["size"], undefined>, number> = {
  xs: 0.5,
  sm: 0.7,
  md: 1,
  lg: 1.2,
  xl: 1.5,
  "2xl": 2,
};
const Logo = ({ size = "md" }: props) => {
  return (
    <div
      // scale={sizeScale[size]}
      // transformOrigin={local === "en" ? "left" : "right"}
      // transition={"transform 0.5s ease-in-out"}
      className="flex items-center transition-transform"
    >
      <Link
        href={`/`}
        className="inline-flex items-center gap-2 text-blue-600 no-underline"
      >
        <span className="w-11 h-11 rounded-lg bg-blue-600 grid place-items-center font-bold text-white">
          E
        </span>
        {size !== "xs" && size !== "sm" && (
          <span className="font-bold text-lg truncate overflow-hidden">
            E-Shop
          </span>
        )}
      </Link>
    </div>
  );
};

export default Logo;
