import { SetStateAction, useEffect, useState } from "react";
import { TArticle } from "../../../types/Article";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import AuthorButtons from "../AuthorButtons/AuthorButtons";
import FavButton from "../FavButton";
import FollowButton from "../FollowButton/FollowButton";
import { getFollowingIdsOf, getFollowingOf } from "../../../service/userService";
import { errorHandler } from "../../../service/handleError";



function ArticleButtons({ article, setArticle } : {
    article: TArticle,
    setArticle: React.Dispatch<SetStateAction<TArticle>>
}) {
    const { author } = article;
    const { authState } = useAuth() as TAuthContext;
    const { loggedUser, headers } = authState;
    const { slug } = useParams();
    const [ followingIds, setFollowingIds ] = useState<number[]>([]);

    useEffect(() => {
        if (!headers) return;
        getFollowingIdsOf({ headers, userId: loggedUser.id})
        .then((followingIds) => setFollowingIds(followingIds))
        .catch((error) => errorHandler(error))
    }, [])
    const checkFollow = (authorId: number | null) => {
        if (!authorId) return false;
        return followingIds.filter((followingId) => authorId === followingId ).length > 0;
    }
    const handleFollow = (isCurrentlyFollowing: boolean) => {
        if (!author.followingCount) return;
        const newFollowingCount = isCurrentlyFollowing ? author.followingCount+1 : author.followingCount-1;
        setArticle((prevArticle) => (
            {...prevArticle, 
                author: {...author, followingCount: newFollowingCount}
            }))
    };
    const handleFav = (article: TArticle) => {
        setArticle((prevArticle) => ({...prevArticle, favoritesCount: article.favoritesCount, isFav: article.isFav}))
    }
    return loggedUser.username === author.username ? (
        <AuthorButtons {...article } slug={slug}/>
    ) : (
        <div className="article-buttons">        
            <FollowButton isFollowing={checkFollow(author.id)} {...author} handleFollow={handleFollow}/>
            <FavButton {...article} handleFav={handleFav}/>
        </div>

    )
}


export default ArticleButtons;