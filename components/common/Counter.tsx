"use client";
import { useCartContext } from "@/context/CartContext";
import React, { use, useEffect, useState } from "react";
import { PiMinus, PiPlus } from "react-icons/pi";
import Spinner from "./loaders/Spinner";

type Props = {
  max: number;
  min: number;
  initialValue?: number;
  onChange: (value: number) => void;
};

const Counter = ({ max, min, initialValue = 1, onChange }: Props) => {
  const [count, setCount] = useState<number>(initialValue);
  const { cartIsUpdating } = useCartContext();
  const [action, setAction] = useState<"incrementing" | "decrementing" | null>(
    null
  );

  const increment = () => {
    if (cartIsUpdating) return;
    if (count > min) {
      setAction("incrementing");
      onChange(count - 1);
      setCount((p) => p - 1);
    }
  };
  const decrement = () => {
    if (cartIsUpdating) return;
    if (count < max) {
      setAction("decrementing");
      onChange(count + 1);
      setCount((p) => p + 1);
    }
  };
  useEffect(() => {
    if (!cartIsUpdating ) {
      setAction(null);
    }
  }, [cartIsUpdating]);
  return (
    <div
      className="flex items-center border border-sub-text rounded-lg w-fit"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <button type="button" className="p-3" onClick={increment}>
        {action === "incrementing" ? <Spinner size="4" /> : <PiMinus />}
      </button>
      <p className="px-3 text-center">{count}</p>
      <button type="button" className="p-3" onClick={decrement}>
        {action === "decrementing" ? <Spinner size="4" /> : <PiPlus />}
      </button>
    </div>
  );
};

export default Counter;
