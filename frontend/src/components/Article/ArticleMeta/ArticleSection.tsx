import Avatar from "../../Avatar";
import { TUser } from "../../../types/User";
import { TArticle } from "../../../types/Article";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import AuthorButtons from "../../Buttons/AuthorButtons/AuthorButtons";
import FollowButton from "../../Buttons/FollowButton";
import FavButton from "../../Buttons/FavButton";

function ArticleSection({
  article,
  setArticle,
}: {
  article: TArticle;
  setArticle: React.Dispatch<React.SetStateAction<TArticle>>; 
}) {

  const { authState } = useAuth() as TAuthContext;
  const { headers, loggedUser } = authState;


  const { author } = article;

  const handleAttributeChange = (article: TArticle) => {
    setArticle((prev) => ({...prev, backgroundColor: article.backgroundColor, fontColor: article.fontColor, emoji: article.emoji, isFav: article.isFav}))
  }

  const handleFollow = (author: TUser) => {
    setArticle((prev) => ({...prev, author: author}))

  }

  return (
    <>
      <div className="col">
        <Avatar username={author.username} imageUrl={author.imageUrl} />
      </div>
      <div className="col">
      { loggedUser.username === article.author.username ? 
            <AuthorButtons
            article={article}
            handleFieldChange={handleAttributeChange}
            />
            :
            <>
              <FollowButton 
              headers={headers}
              username={article.author.username}
              isFollowing={article.author.isFollowing}
              handleFollow={handleFollow}/>
              <FavButton 
              headers={headers}
              slug={article.slug}
              isFav={article.isFav}
              handleFav={handleAttributeChange}
              />
            </>
          }
      </div>
    </>

  );
}

export default ArticleSection;
