import { useEffect, useState } from "react";
import { TArticleData, getArticles } from "../service/articleService";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { errorHandler } from "../service/handleError";

function useArticle({location, username, tags, tabName } : { location: string, username: string, tags: string[], tabName: string}) {
    const [ { articles, articlesCount }, setArticlesData] = useState<TArticleData>({ articles: [], articlesCount: 0});
    const [ isLoading, setLoading ] = useState(true);
    const { authState } = useAuth() as TAuthContext;
    const { headers } = authState;

    useEffect( () => {
        if (!headers && tabName === "Feed") return;

        setLoading(true);
        if (!headers) {return }
        getArticles({location, username, tags, headers })
        .then((articleData) => {
            setArticlesData(articleData)
        })
        .catch((error) => {errorHandler(error)})
        .finally(() => {setLoading(false)});
    }, [headers, tabName, tags, articles])

    return { articles, articlesCount, isLoading, setArticlesData };
}


export default useArticle;