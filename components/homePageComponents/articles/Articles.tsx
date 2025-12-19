import ArrowLink from "@/components/common/ArrowLink";
import ArticleCard from "@/components/common/ArticleCard";
import ArticleCardSkeleton from "@/components/common/ArticleCardSkeleton";
import { axiosInstance } from "@/lib/axios";
import { IArticle } from "@/types";
import React, { Suspense } from "react";

const Articles = async () => {
  const { data, status } = await axiosInstance<{ data: IArticle[] }>("home/featured-blogs");
  if (status !== 200) return (<div className="text-center">Oops! something went wrong</div>);
  return (
    <div className="container my-12">
      <div className="flex justify-between mb-12 items-center">
        <h2 className="text-text text-4xl font-bold">Articles</h2>
        <ArrowLink href="/blog">More Articles</ArrowLink>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<ArticleCardSkeleton />}>
          {data.data.map((article) => (
            <ArticleCard key={article._id} data={article} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};
export default Articles;
