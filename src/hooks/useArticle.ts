import { useEffect, useState } from "react";
import { TArticleData, getArticles } from "../service/articleService";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { errorHandler } from "../service/handleError";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { getUserById, logoutUser } from "../service/userService";

function useArticle({location, username = null, tagName } : { 
    location: string, 
    username?: string | null, 
    tagName: string
}) {

    const navigate = useNavigate();
    //loading and headers
    const [ isLoading, setLoading ] = useState(true);
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const { headers } = authState;

    //articles    
    const [ { articles, articlesCount }, setArticlesData] = useState<TArticleData>(
        { articles: [], articlesCount: 0}
        );


    //hook
    useEffect( () => {
        if (!headers) { setLoading(false); return };

        setLoading(true);
        //get articles
        getArticles({location, tagName, headers, username })
        .then((articleData) => {
            
            //if user is logged we get his current fav articles 
            if (headers) {
                getArticles({location:"favList", headers})
                .then((favArticles) => {
                    //and then figure which of the global articles are included in user's favorites
                    articleData.articles = articleData.articles.map((art) => {
                        art.isFav = favArticles.articles.includes(art);
                        return art;
                    })
                })
                .catch((error) => {errorHandler(error)})
            }
            //retrieve the author for each article
            articleData.articles = articleData.articles.map((article) => { 
                getUserById({ userId: article.userId })
                .then((author) => article.author = author)
                .catch((error) => errorHandler(error) );
                return article;
            })
            console.log(articleData.articles)
            setArticlesData(articleData);
            

        })
        .catch((error: AxiosError) => {
            errorHandler(error);
            const status = error.response?.status;
            if (status === 406) {
                alert("Token expired, please login again");
                setAuthState(logoutUser());
                // navigate("/login");
                
            }
        })
        .finally(() => {setLoading(false)});

    }, [headers, location, tagName, username])

    return { articles, articlesCount, setArticlesData, isLoading };
}


export default useArticle;