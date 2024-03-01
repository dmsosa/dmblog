import { useEffect, useState } from "react";
import { TArticle } from "../types/Article";
import { getArticleBySlug } from "../service/articleService";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { errorHandler } from "../service/handleError";
import { getUserById, logoutUser } from "../service/userService";
import { useNavigate } from "react-router-dom";
import { TUser } from "../types/User";

const initAuthor: TUser = {
    id: null,
    username: "author",
    email: "",
    password: "",
    image: "",
    bio: "",
    followersCount: 0, 
    followingCount: 0,
    followers: null,
    following: null,
    createdAt: null,
    updatedAt: null
}



const initArticle: TArticle = {
    id: null,
    userId: null,
    title: "title",
    author: initAuthor,
    description: "",
    body: "<h1>Hello artissssssssssssssssss</h1>",
    slug: "",
    tagList: [],
    isFav: false,
    favoritesCount: 0,
    createdAt: null,
    updatedAt: null
}


function useArticleBySlug({ slug, state } : { slug: string | undefined, state: TArticle | null }) {
        

    const [ loading, setLoading ] = useState(false);
    const [ article, setArticle ] = useState<TArticle>(state || initArticle);
    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const { headers } = authState;


    const handleTokenExpired = () => {
        alert("Token expired, Bruder!\n\nRedirecting to login");
        navigate("/login");
        setAuthState(logoutUser());
    }
    useEffect(() => {
        if (!slug ) return;
        setLoading(true);
        if (state ) {
            getUserById({ userId: article.userId })
            .then((author) => {
                state.author = author;
                setArticle(state as TArticle);
            })
            .catch((error) => {
                errorHandler(error) 
                const status = error.response?.status;
                if (status === 406) {
                    handleTokenExpired()
                } else {
                    navigate("/not-found", { replace: true })
                }
            })
            .finally(() => setLoading(false));
        } else {

            getArticleBySlug({slug})
            .then((article) => {
                getUserById({ userId: article.userId})
                .then((author) => {
                    article.author = author;
                    setArticle(article);
                })
                .catch((error) => { 
                    errorHandler(error) 
                    const status = error.response?.status;
                    if (status === 406) {
                        handleTokenExpired()
                    } else {
                        navigate("/not-found", { replace: true })
                    }
                })
            })
            .catch((error) => { 
                errorHandler(error)
                const status = error.response?.status;
                if (status === 406) {
                    handleTokenExpired()
                } else {
                    navigate("/not-found", { replace: true })
                }
            })
            .finally(() => { setLoading(false) })
        }
        
    },[slug, headers, article])

    return { loading, article, setArticle };
}

export default useArticleBySlug;