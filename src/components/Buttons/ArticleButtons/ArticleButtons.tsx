import { SetStateAction } from "react";
import { TArticle } from "../../../types/Article";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import AuthorButtons from "../AuthorButtons/AuthorButtons";
import FavButton from "../FavButton";
import FollowButton from "../FollowButton/FollowButton";
import { TUser } from "../../../types/User";

const initAuthor: TUser = {
    id: null,
    username: "author",
    email: "",
    password: "",
    image: "",
    bio: "",
    followersCount: 0, 
    followingCount: 0,
    createdAt: null,
    updatedAt: null
}


const initArticle: TArticle = {
    id: null,
    userId: null,
    title: "title",
    author: initAuthor,
    description: "",
    body: "<h1>Hello arti</h1>",
    slug: "",
    tagList: [],
    isFav: false,
    favoritesCount: 0,
    createdAt: null,
    updatedAt: null
}

function ArticleButtons({ article = initArticle, setArticle } : {
    article: TArticle,
    setArticle: React.Dispatch<SetStateAction<TArticle>>
}) {
    const { author } = article;
    const { authState } = useAuth() as TAuthContext;
    const { loggedUser } = authState;
    const { slug } = useParams();

    const checkFollow = (authorId: number | null) => {
        if (!authorId) return false;
        return false;
    }
    const handleFollow = (author: TUser) => {
        setArticle((prev) => ({...prev, author}))
    };
    const handleFav = (article: TArticle) => {
        setArticle((prev) => ({...prev, article}))
    }
    return loggedUser.username === author.username ? (
        <AuthorButtons {...article } slug={slug}/>
    ) : (
        <div className="article-buttons">        
            <FollowButton isFollowing={checkFollow(author.id) } {...author} handler={handleFollow}/>
            <FavButton {...article} handleFav={handleFav}/>
        </div>

    )
}


export default ArticleButtons;