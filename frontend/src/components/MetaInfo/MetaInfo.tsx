import { TUser } from "../../types/User";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import FavButton from "../Buttons/FavButton";
import FollowButton from "../Buttons/FollowButton";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { TArticle } from "../../types/Article";

function MetaInfo({ article, handleFollow, handleFav }: { article: TArticle, handleFollow: (author: TUser) => void, handleFav: (article: TArticle) => void }) {

    const { authState } = useAuth() as TAuthContext;
    const { headers, loggedUser } = authState;
    const { author } = article;

    return (
        <>
        <div className="col">
            <Avatar username={author.username} imageUrl={author.imageUrl} />
        </div>
        <div className="col article-item--buttons">
            { loggedUser.username === article.author.username ? 
                    <Link className="btn btn-secondary" to={`/editor/${article.slug}`} state={article}>Edit</Link>
                    :
                    <FollowButton 
                    headers={headers}
                    username={article.author.username} 
                    isFollowing={article.author.isFollowing}
                    handleFollow={handleFollow} />    
                }
                <FavButton
                headers={headers}
                slug={article.slug}
                isFav={article.isFav}
                handleFav={handleFav}
                />       
        </div>
        </>
    )
}

export default MetaInfo;