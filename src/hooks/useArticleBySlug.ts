import { useEffect, useState } from "react";
import { TArticle } from "../types/Article";
import { getArticleBySlug } from "../service/articleService";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { errorHandler } from "../service/handleError";
import { getUserById } from "../service/userService";
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
    const { authState } = useAuth() as TAuthContext;
    const { headers } = authState;


    useEffect(() => {
        if (!headers ) return;
        if (!slug || state) return;

        setLoading(true);
        getArticleBySlug({headers, slug})
        .then((article) => {
            getUserById({headers, userId: article.userId})
            .then((author) => {
                article.author = author;
                setArticle(article);
            })
            .catch((error) => { 
                errorHandler(error) 
                navigate("/not-found", { replace: true })
            })
        })
        .catch((error) => { 
            errorHandler(error) 
            navigate("/not-found", { replace: true })
        })
        .finally(() => { setLoading(false) })
    },[slug, headers])

    return { loading, article, setArticle };
}

export default useArticleBySlug;