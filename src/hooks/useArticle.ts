import { useEffect, useState } from "react";
import { TArticleData, getArticles } from "../service/articleService";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { errorHandler } from "../service/handleError";

function useArticle({location, username = null, tagName } : { 
    location: string, 
    username?: string | null, 
    tagName: string
}) {
    var [ { articles, articlesCount }, setArticlesData] = useState<TArticleData>(
        { articles: [], articlesCount: 0}
        );

    const [ isLoading, setLoading ] = useState(true);

    const [ favArticles, setFavArticles ] = useState<TArticleData>(
        { articles: [], articlesCount: 0}
        );
    const { authState } = useAuth() as TAuthContext;
    const { headers } = authState;

    useEffect( () => {
        if (!headers && location === "Feed") return;

        setLoading(true);
        //get articles
        getArticles({location, tagName, headers, username })
        .then((articleData) => {
            setArticlesData(articleData)
        })
        .catch((error) => {errorHandler(error)})
        .finally(() => {setLoading(false)});

        if (headers) {
            getArticles({location:"favList", headers})
            .then((articleData) => (setFavArticles(articleData)))
            .catch((error) => {errorHandler(error)})
        }

        articles = articles.map((art) => {
            art.isFav = favArticles.articles.includes(art);
            return art;
        })

    }, [headers, location, tagName, username])

    return { articles, articlesCount, setArticlesData,
             favArticles, isLoading };
}


export default useArticle;