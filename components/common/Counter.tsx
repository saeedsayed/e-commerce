"use client";
import { useCartContext } from "@/context/CartContext";
import React, { useState } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";

type Props = {
  max: number;
  min: number;
  initialValue?: number;
  onChange: (value: number) => void;
};

const Counter = ({ max, min, initialValue = 1, onChange }: Props) => {
  const [count, setCount] = useState<number>(initialValue);
  const { cartStatus } = useCartContext();

  const increment = () => {
    if (cartStatus === "updating") return;
    if (count > min) {
      onChange(count - 1);
      setCount((p) => p - 1);
    }
  };
  const decrement = () => {
    if (cartStatus === "updating") return;
    if (count < max) {
      onChange(count + 1);
      setCount((p) => p + 1);
    }
  };
  return (
    <div
      className="flex items-center border border-sub-text rounded-lg w-fit"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <button type="button" className="p-3" onClick={increment}>
        <PiMinus />
      </button>
      <p className="px-3 text-center">{count}</p>
      <button type="button" className="p-3" onClick={decrement}>
        <PiPlus />
      </button>
    </div>
  );
};

export default Counter;
