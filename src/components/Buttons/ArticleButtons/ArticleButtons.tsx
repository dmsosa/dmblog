import { SetStateAction } from "react";
import { TArticle } from "../../../types/Article";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
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


    const handleFollow = (author: TUser) => {
        setArticle((prevArticle) => ({...prevArticle, author}))
    };
    const handleFav = (article: TArticle) => {
        setArticle((prevArticle) => ({...prevArticle, favoritesCount: article.favoritesCount, isFav: article.isFav}))
    }
    const setArticleWithNewFields = (article: TArticle) => {
        setArticle((prevArticle) => ({...prevArticle, backgroundColor: article.backgroundColor, emoji: article.emoji}))
    }

    return !!article && !!author && loggedUser.username === author.username ? (
        <>
            <AuthorButtons {...article } setArticleWithNewFields={setArticleWithNewFields}/>
        </>
    ) : (
        <div className="row row-cols-2">      
            <FavButton {...article} handleFav={handleFav}/>
            <FollowButton {...author}  handleFollow={handleFollow}/>
        </div>

    )
}


export default ArticleButtons;