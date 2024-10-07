import { useState } from "react";
import { toggleFavs } from "../../service/articleService";
import { TArticle } from "../../types/Article";
import { ApiError } from "../../service/errorHandler";

function FavButton({
  headers,
  slug,
  isFav,
  handleFav,
}: {
  headers: object | null;
  slug: string;
  isFav: boolean;
  handleFav: (article: TArticle) => void;
}) {
  const [loading, setLoading] = useState(false);

  const className = isFav ? "btn btn-info favorited" : "btn btn-info";
  const innerText = isFav ? "Unfavored" : "Favorite";

  const handleClick = () => {
    if (!headers) return alert("You need to login first!");
  
    setLoading(true);

    toggleFavs({ headers, slug, isFav })
      .then((article) => {
        handleFav(article);
      })
      .catch((error: ApiError) => console.log(error.getDefaultMessage()))
      .finally(() => setLoading(false));
  };
  return ( 
    <button
      className={className}
      onClick={handleClick}
      disabled={loading}
    >
      <i>{innerText}</i>
    </button>
  );
}

export default FavButton;
