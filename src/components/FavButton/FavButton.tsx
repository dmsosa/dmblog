import {  useState } from "react"
import { toggleFavs } from "../../service/articleService"
import { TAuthContext, useAuth } from "../../context/AuthContext"

function FavButton({ slug, favorited, favCount, handleFav } : { slug: string, favorited: boolean, favCount: number, handleFav: (article: any) => void } ) {

    const { authState } = useAuth() as TAuthContext;
    const { headers } = authState;
    
    const [loading, setLoading] = useState(false);
    const buttonStyle = favorited? "active":"";
    const innerText = favorited? "Favorite":"";



    const handleClick = () => {
        if (!headers) {
            return alert("You need to login first!");
        }
        setLoading(true);
        toggleFavs({ headers, slug, favorited})
        .then((article) => {handleFav(article)})
        .catch((error) => (console.log(error)))
        .finally(() => setLoading(false))
    }
    return (
        <button className={`btn btn-fav ${buttonStyle}`} onClick={handleClick} disabled={loading}>
            <i>{innerText}</i>
            <span>{`favorites ${favCount}`}</span>
        </button>
    )
}

export default FavButton;