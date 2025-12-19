import { getData } from "@/lib/getAPI";
import React, { Suspense } from "react";
import { ArticleCard, ArticleCardSkeleton } from "../common";
import { Article } from "@/types/article.type";

const BlogList = async () => {
  const [error, data]: [string | null, Article[]] = await getData("articles", [
    "*",
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Suspense fallback={<ArticleCardSkeleton />}>
        {error ? (
          <p>{error}</p>
        ) : (
          data.map((article) => <ArticleCard key={article.id} data={article} />)
        )}
      </Suspense>
    </div>
  );
};

export default BlogList;
