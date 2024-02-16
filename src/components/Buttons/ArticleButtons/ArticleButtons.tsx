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
    const { authState } = useAuth() as TAuthContext;
    const { headers, loggedUser } = authState;
    const { slug } = useParams();
    var author = article.author;
    const checkFollow = (authorId: number | null) => {
        if (!authorId) return false;
        return loggedUser.following.filter((followingUser) => followingUser.id === authorId).length > 0;
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
            <FavButton {...article} username={author.username} headers={headers} handleFav={handleFav}/>
        </div>

    )
}


export default ArticleButtons;