import { useEffect, useState } from "react";
import { TArticleData, getArticles } from "../service/articleService";
import { ApiError } from "../service/errorHandler";

function useArticle({
  location,
  tags,
  searchString = null,
  username = null,
  initOffset = 0,
}: {
  location: string;
  tags: string[];
  searchString?: string | null;
  username?: string | null;
  initOffset?: number;
}) {
  //loading and headers
  const [isLoading, setLoading] = useState(true);
  const [ offset, setOffset ] = useState(initOffset);
  //articles
  const [{ articles, articlesCount }, setArticlesData] = useState<TArticleData>(
    { articles: [], articlesCount: 0 },
  );

  //hook
  useEffect(() => {
    setLoading(true);
    //get articles
    getArticles({ location, tags, searchString, username, offset })
      .then((articleData) => {
        setArticlesData(articleData);
      })
      .catch((error: ApiError) => {
        console.log(error.getMessage())
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location, tags, searchString, username, offset ]);

  return { articles, articlesCount, setArticlesData, isLoading, offset, setOffset };
}

export default useArticle;
