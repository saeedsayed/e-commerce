"use client";
import { useShopContext } from "@/context/ShopContext";
import { Color } from "@/types/product.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  colors: Color[];
};

const ColorOptions = ({ colors }: Props) => {
  const [currentColor, setCurrentColor] = useState<Color>(colors[0]);
  const { setImages, setColor } = useShopContext();
  useEffect(() => {
    setImages(currentColor.example.data.map((item) => item.attributes.url));
    setColor(currentColor.name);
  }, [currentColor]);
  return (
    <div className="my-6 flex flex-col gap-4">
      <h3 className="text-sub-text">Choose Color</h3>
      <h5 className="text-lg">{currentColor.name}</h5>
      <div className="flex gap-4 flex-wrap">
        {colors.map((color) => (
          <div
            className={`relative w-14 h-14 cursor-pointer ${
              color.name === currentColor.name && "border-black border"
            }`}
            key={color.name}
            onClick={() => setCurrentColor(color)}
          >
            <Image
              src={color.example.data[0].attributes.formats.thumbnail.url}
              alt=""
              className="object-contain w-8/12 h-8/12"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorOptions;
