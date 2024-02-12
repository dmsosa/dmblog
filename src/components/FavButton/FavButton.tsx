import {  useEffect, useState } from "react"
import { toggleFavs } from "../../service/articleService"
import { TAuthContext, useAuth } from "../../context/AuthContext"

function FavButton({ headers, username, slug, favCount, isFav, handleFav } : { 
    headers: object | null, 
    username: string | null, 
    slug: string, 
    favCount: number, 
    isFav: boolean,
    handleFav: (article: any) => void } ) {


    
    const [loading, setLoading] = useState(false);
        
    
    const buttonStyle = isFav ? "":"active";
    const innerText = isFav ? "Favorite":"Mark as favorite";


    const handleClick = () => {
        if (!headers || !username) {
            return alert("You need to login first!");
        }
        setLoading(true);
        toggleFavs({ headers, username, slug, isFav})
        .then((article) => {handleFav(article)})
        .catch((error) => (console.log(error)))
        .finally(() => setLoading(false))
    }
    return (
        <button className={`btn btn-fav ${buttonStyle}`} onClick={handleClick} disabled={loading}>
            <i>{innerText}</i>
            <span>{` ${favCount}`}</span>
        </button>
    )
}

export default FavButton;