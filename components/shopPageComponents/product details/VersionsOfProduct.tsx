"use client";
import { IVersion } from "@/types/product.type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  versions: IVersion[];
};

const VersionsOfProduct = ({ versions }: Props) => {
  return (
    <div className="my-6 flex flex-col gap-4">
      <h3 className="text-sub-text">Choose Model</h3>
      {/* <h5 className="text-lg">{version?.versionName}</h5> */}
      <div className="flex gap-4 flex-wrap">
        {versions.map((version) => (
          <Link
            className={`relative w-14 h-14 cursor-pointer ${
              version.versionName === version?.versionName &&
              "border-black border"
            }`}
            key={version.versionName}
            href={`${version.version._id}?name=${version.version.title}`}
            // onClick={() => setVersion(version)}
          >
            <div className="relative w-full h-full">
              <Image
                src={version.version.thumbnail}
                alt=""
                className="object-contain w-8/12 h-8/12"
                fill
              />
            </div>
            <h5 className="">{version.versionName}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VersionsOfProduct;
