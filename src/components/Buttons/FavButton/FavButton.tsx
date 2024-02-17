import {  useState } from "react"
import { toggleFavs } from "../../../service/articleService"
import { TAuthContext, useAuth } from "../../../context/AuthContext";

function FavButton({  slug, favoritesCount, isFav, handleFav } : { 
    slug: string, 
    favoritesCount: number, 
    isFav: boolean,
    handleFav: (article: any) => void } ) {


    
    const [loading, setLoading] = useState(false);
    const { authState } = useAuth() as TAuthContext;
    const { headers } = authState;
    
    const buttonStyle = isFav ? "":"active";
    const innerText = isFav ? "Favorite":"Mark as favorite";


    const handleClick = () => {
        if (!headers) {
            return alert("You need to login first!");
        }
        setLoading(true);
        toggleFavs({ headers, slug, isFav})
        .then((article) => {handleFav(article)})
        .catch((error) => (console.log(error)))
        .finally(() => setLoading(false))
    }
    return (
        <button className={`btn btn-fav ${buttonStyle}`} onClick={handleClick} disabled={loading}>
            <i>{innerText}</i>
            <span>{` ${favoritesCount}`}</span>
        </button>
    )
}

export default FavButton;