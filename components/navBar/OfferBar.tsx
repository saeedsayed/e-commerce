// icons
import { FaArrowRightLong } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";

const OfferBar = async () => {
  const {
    data: { data: OfferBarData },
  } = await axiosInstance<{ data: string }>("/home/newsbar");
  return (
    <div dangerouslySetInnerHTML={{__html:OfferBarData}} />
    // <div className="w-full overflow-hidden">
      // <Link
      //   href={"https://eng-saeed.netlify.app"}
      //   target="_blank"
      //   rel="noopener noreferrer"
      //   className={`
      //     flex items-center justify-center gap-3 px-4 py-3
      //     bg-gradient-to-r from-blue-50 via-white to-blue-50
      //     border-0 sm:border border-blue-200
      //     hover:border-blue-400
      //     shadow-sm sm:shadow-md hover:shadow-lg
      //     transition-all duration-300 ease-out
      //     group relative
      //     cursor-pointer select-none
      //     overflow-hidden
      //   `}
      // >
      //   {/* Animated gradient background on hover */}
      //   <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-blue-500/0 group-hover:from-blue-400/5 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none" />

      //   {/* Content wrapper */}
      //   <div className="relative z-10 flex items-center gap-3">
      //     {/* Icon badge */}

      //     {/* Text content */}
      //     <p className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300 whitespace-nowrap">
      //       Created by{" "}
      //       <span className="font-semibold text-blue-600 group-hover:text-blue-700">
      //         ENG: SAEED
      //       </span>
      //     </p>

      //     {/* Arrow icon with animation */}
      //     <div className="flex-shrink-0 ml-1">
      //       {/* <FaArrowRightLong className="text-blue-600 text-sm group-hover:text-blue-700 group-hover:translate-x-1 transition-all duration-300" /> */}
      //       🌐
      //     </div>
      //   </div>
      // </Link>
    // </div>
  );
};

export default OfferBar;
