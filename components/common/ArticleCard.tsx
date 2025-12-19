import Image from "next/image";
import React from "react";
import ArrowLink from "./ArrowLink";
import { IArticle } from "@/types";

type Props = {
  data: IArticle;
};

const ArticleCard = ({ data }: Props) => {
  return (
    <div>
      <div className="relative h-80">
        <Image
          src={data?.thumbnail|| ""}
          alt={data?.title}
          fill
        />
      </div>
      <div>
        <h3 className="text-xl font-medium mt-6 mb-2">{data?.title}</h3>
        <ArrowLink href={`/blog/${data._id}`}>Read Article</ArrowLink>
      </div>
    </div>
  );
};

export default ArticleCard;
