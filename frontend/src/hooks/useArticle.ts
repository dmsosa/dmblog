import { useEffect, useState } from "react";
import { TArticleData, getArticles } from "../service/articleService";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { errorHandler } from "../service/errorHandler";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { logoutUser } from "../service/userService";

function useArticle({
  location,
  username = null,
  tagName,
}: {
  location: string;
  username?: string | null;
  tagName: string;
}) {
  const navigate = useNavigate();
  //loading and headers
  const [isLoading, setLoading] = useState(true);
  const { authState, setAuthState } = useAuth() as TAuthContext;
  const { headers } = authState;

  //articles
  const [{ articles, articlesCount }, setArticlesData] = useState<TArticleData>(
    { articles: [], articlesCount: 0 },
  );

  //hook
  useEffect(() => {
    setLoading(true);
    //get articles
    getArticles({ location, tagName, headers, username })
      .then((articleData) => {
        console.log("Arts", articleData)
        setArticlesData(articleData);
      })
      .catch((error: AxiosError) => {
        errorHandler(error);
        const status = error.response?.status;
        if (status === 406) {
          alert("Token expired, please login again");
          setAuthState(logoutUser());
          navigate("/login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [headers, location, tagName, username, navigate, setAuthState]);

  return { articles, articlesCount, setArticlesData, isLoading };
}

export default useArticle;
