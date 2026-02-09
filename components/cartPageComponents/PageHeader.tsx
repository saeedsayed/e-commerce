"use client";
import { CHECKOUT_STEPS } from "@/constants";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCheck } from "react-icons/fa6";

const PageHeader = () => {
    const path = usePathname();
    const currentStep = CHECKOUT_STEPS.find((step) => step.path === path)?.step || 1;
    const themeColor = (step: number): { bg: string, text: string, borderColor: string } => {
        if (step === currentStep && step !== CHECKOUT_STEPS.length) {
            // if current page and not last page
            return { bg: "bg-black", text: "text-black", borderColor: "border-b-black" }
        } else if (currentStep > step || currentStep === CHECKOUT_STEPS.length) {
            // if previous page or last page
            return { bg: "bg-[#38CB89]", text: "text-[#38CB89]", borderColor: "border-b-[#38CB89]" }
        }
        // if next page
        return { bg: "bg-[#B1B5C3]", text: "text-[#B1B5C3]", borderColor: "border-b-transparent" }
    }
    return (
        <>
            <h2 className="text-[40px] font-medium sm:text-[54px] text-center mb-10 sm:mb-20">
                {path.split("/").pop()}
            </h2>
            <ul
                className={`flex items-center justify-start m-auto max-w-fit gap-8 overflow-x-auto no-scrollbar`}
            >
                {CHECKOUT_STEPS.map((step) => (
                    <li
                        key={step.step}
                        className={`flex gap-4 shrink-0 items-center text-[16px] font-medium sm:text-[12px] md:text-[16px]
                                        text-center pb-6 border-b-2 ${themeColor(step.step).text} ${themeColor(step.step).borderColor}`}
                    >
                        <span
                            className={`w-10 h-10 sm:w-7 sm:h-7 md:w-10 md:h-10 rounded-full
                            text-white flex items-center justify-center ${themeColor(step.step).bg}`}
                        >
                            {currentStep > step.step || currentStep === CHECKOUT_STEPS.length ? <FaCheck /> : step.step}
                        </span>
                        {step.name}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PageHeader;
