import { SetStateAction } from "react";
import { TArticle } from "../../../types/Article";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import AuthorButtons from "../AuthorButtons/AuthorButtons";
import FavButton from "../FavButton";
import FollowButton from "../FollowButton/FollowButton";
import { TUser } from "../../../types/User";



function ArticleButtons({ article, setArticle } : {
    article: TArticle,
    setArticle: React.Dispatch<SetStateAction<TArticle>>
}) {
    const { author } = article;
    const { authState } = useAuth() as TAuthContext;
    const { loggedUser } = authState;
    const { slug } = useParams();


    const handleFollow = (author: TUser) => {
        setArticle((prevArticle) => ({...prevArticle, author}))
    };
    const handleFav = (article: TArticle) => {
        setArticle((prevArticle) => ({...prevArticle, favoritesCount: article.favoritesCount, isFav: article.isFav}))
    }
    return !!article && !!author && loggedUser.username === author.username ? (
        <>
            <AuthorButtons {...article } slug={slug}/>
        </>
    ) : (
        <div className="row row-cols-2">      
            <FavButton {...article} handleFav={handleFav}/>
            <FollowButton {...author}  handleFollow={handleFollow}/>
        </div>

    )
}


export default ArticleButtons;