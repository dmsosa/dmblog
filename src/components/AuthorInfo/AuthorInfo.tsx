import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { TUser } from "../../types/User";
import AuthorMeta from "./AuthorMeta";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { getUserByUsername } from "../../service/userService";
import { errorHandler } from "../../service/handleError";
import MDEditor from "@uiw/react-md-editor";

function AuthorInfo() {

    const { state } = useLocation();
    const { username } = useParams();
    const navigate = useNavigate();

    const { authState } = useAuth() as TAuthContext;
    const { headers } = authState;
    const [ loading, setLoading ] = useState(false);
    const [ author, setAuthor ] = useState( state || {} )
    const { image, bio, isFollowing, followersCount } = author;

    useEffect(() => {
        if (!username) return;
        getUserByUsername({ headers, username })
        .then((author) => setAuthor(author))
        .catch((error) => {
            errorHandler(error)
            navigate("/not-found");
        })
        .finally(() => setLoading(false))
    }, []);

    const handleFollow = (author: TUser) => {
        console.log(author, "changed")
        setAuthor(author)
    }

    return (
        loading ? <div> Loading author info . . . </div> :
        <div className="author-info row row-cols-2">
            <AuthorMeta 
            username={username || ""}
            loading={loading}
            image={image}
            followersCount={followersCount}
            isFollowing={isFollowing}
            handleFollow={handleFollow}/>
            { bio && 
                <div className="author-bio col col-12">
                    <h1>Biography</h1>
                    <p>{bio}</p>
                </div>}

        </div>
    )
}

export default AuthorInfo;