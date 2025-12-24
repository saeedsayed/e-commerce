import React from "react";
import { IArticle } from "@/types";
import { ArrowLink, ArticleCard, Breadcrumbs } from "@/components/common";
import Image from "next/image";
import HandleArticleBody from "@/components/blogPageComponents/blogDetails/HandleArticleBody";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  // const [error, data]: [string | null, Article] = await getData(
  //   `articles/${params.slug}`,
  //   ["*"]
  // );
  // const [err, relatedData]: [string | null, Article[]] = await getData(
  //   "articles",
  //   ["*"],
  //   [
  //     {
  //       field: "[categories][name]",
  //       operator: "eqi",
  //       value: data?.attributes?.categories?.data?.[0]?.attributes?.name,
  //     },
  //   ],
  //   3
  // );

  // const paths = [
  //   { name: "Home", path: "/" },
  //   { name: "Blog", path: "/blog" },
  //   { name: data?.attributes?.title, path: `/blog/${data.id}` },
  // ];
  // let arrayOfLines = data?.attributes?.body
  //   .split("\n")
  //   .filter((item) => item !== "");
  return (
    <div className="container mb-20">
      {/* <Breadcrumbs paths={paths} />
      <h3 className="text-xs font-bold md:mt-8 mb-6">ARTICLE</h3>
      <h2 className="text-2xl md:text-5xl font-semibold">
        {data?.attributes?.title}
      </h2>
      <div className="relative w-full h-[380px] md:h-[647px] my-5 md:my-10">
        <Image
          src={data?.attributes?.thumbnail?.data?.attributes?.url}
          className="object-cover"
          alt="article image"
          fill
        />
      </div>
      <div>
        {arrayOfLines?.map((line) => (
          <HandleArticleBody key={crypto.randomUUID()} item={line} />
        ))}
      </div> */}
      {/* related articles section */}
      {/* <div className="flex justify-between mt-20 mb-10 items-center">
        <h2 className="text-text text-2xl font-bold">You might also like</h2>
        <ArrowLink href="/blog">More Articles</ArrowLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedData.map((item) => (
          <ArticleCard key={crypto.randomUUID()} data={item} />
        ))}
      </div> */}
    </div>
  );
};

export default page;
