"use client"
import React, { useState } from "react";
// icons
import { FaArrowRightLong } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

const OfferBar = () => {
  const [showBar, setShowBar] = useState(true);
  const router = useRouter();
  return (
    <>
      {showBar &&
        <div onClick={() => router.push('/shop')} className={`flex items-center justify-center bg-primary py-2 gap-3 relative cursor-pointer select-none`}>
          <CiDiscount1 className="w-4 h-4 sm:w-6 sm:h-6 font-bold " />
          <p className="sm:text-sm text-xs font-semibold">
            30% off storewide — Limited time!
          </p>
          <span className="hidden sm:block text-sm font-medium text-[#377DFF]">Shop Now</span>
          <FaArrowRightLong className="text-[#377dff]" />
          <button className="absolute right-4 w-[10px] aspect-square hover:text-red-600" onClick={(e) => { e.stopPropagation(); setShowBar(false) }}>
            <IoClose />
          </button>
        </div>
      }
    </>
  );
};

export default OfferBar;
