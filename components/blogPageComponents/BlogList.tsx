import React, { Suspense } from "react";
import { ArticleCard, ArticleCardSkeleton } from "../common";
import { axiosInstance } from "@/lib/axios";
import { IArticle } from "@/types";

const BlogList = async () => {
  const { data, status, statusText } = await axiosInstance<{
    data: IArticle[];
  }>("/blogs");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Suspense fallback={<ArticleCardSkeleton />}>
        {status > 299 ? (
          <p>{statusText}</p>
        ) : (
          data.data.map((article) => (
            <ArticleCard key={article._id} data={article} />
          ))
        )}
      </Suspense>
    </div>
  );
};

export default BlogList;
