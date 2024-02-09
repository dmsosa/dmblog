import { useEffect, useState } from "react";
import { TArticleData, getArticles } from "../service/articleService";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { errorHandler } from "../service/handleError";
import { TArticle } from "../types/Article";

function useArticle({location, username, tagName, tabName } : { location: string, username?: string, tagName: string, tabName: string}) {
    const [ { articles, articlesCount }, setArticlesData] = useState<TArticleData>({ articles: [], articlesCount: 0});
    const [ isLoading, setLoading ] = useState(true);
    const { authState } = useAuth() as TAuthContext;
    const { headers } = authState;

    useEffect( () => {
        if (!headers && tabName === "Feed") return;

        setLoading(true);
        getArticles({location, tagName, headers, username })
        .then((articleData) => {
            setArticlesData(articleData)
        })
        .catch((error) => {errorHandler(error)})
        .finally(() => {setLoading(false)});
    }, [headers, tabName, tagName, username])

    return { articles, articlesCount, isLoading, setArticlesData };
}


export default useArticle;