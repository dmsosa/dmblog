import { Link, useNavigate } from "react-router-dom";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { deleteArticleBySlug } from "../../../service/articleService";

function AuthorButtons({title, body, description, tagList, slug} : {
    title: string,
    body: string,
    description: string,
    tagList: string[],
    slug: string | undefined
}) {
    const { authState } = useAuth() as TAuthContext;
    const { headers, isAuth } = authState;
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isAuth) return alert("You need to login first!");
        if (!slug) return console.log(`Article with slug ${slug} does not exists!`);
        deleteArticleBySlug({slug, headers})
        .then((message) =>
            { 
                alert(message);
                navigate("/")
            }
        ).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className="author-buttons">
            <Link
            className="nav-link"
            state={{ title, body, description, tagList }}
            to={`/dmblog/editor/${slug}`}>
                <button className="btn">Edit</button>
            </Link>
            <button className="btn">Change access</button>
            <button className="btn btn-danger" onClick={handleClick}>Delete</button>
        </div>
    )
}

export default AuthorButtons;