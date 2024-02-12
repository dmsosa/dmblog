import { useEffect, useState } from "react";
import { TArticleData, getArticles, getFavsOfUser } from "../service/articleService";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { errorHandler } from "../service/handleError";
import { TArticle } from "../types/Article";

function useArticle({location, username = null, headers, tagName, tabName } : { 
    location: string, 
    username: string | null, 
    headers: object | null, 
    tagName: string, 
    tabName: string
}) {
    var [ { articles, articlesCount }, setArticlesData] = useState<TArticleData>(
        { articles: [], articlesCount: 0}
        );

    const [ isLoading, setLoading ] = useState(true);

    const [ favArticles, setFavArticles ] = useState<TArticleData>(
        { articles: [], articlesCount: 0}
        );

    useEffect( () => {
        if (!headers && tabName === "Feed") return;

        setLoading(true);
        //get global articles
        getArticles({location, tagName, headers, username })
        .then((articleData) => {
            setArticlesData(articleData)
        })
        .catch((error) => {errorHandler(error)})
        .finally(() => {setLoading(false)});

        //get favs articles of user
        if (username && headers) {
            getFavsOfUser({ headers, username })
            .then((favArticles: TArticleData) => { 
                setFavArticles(favArticles);
                articles = articles.map((art) => {
                    art.isFav = favArticles.articles.includes(art); 
                    return art});
            }).catch((error) => console.error(error)) 
        };

    }, [headers, tabName, tagName, username])

    return { articles, articlesCount, setArticlesData,
             favArticles, isLoading };
}


export default useArticle;