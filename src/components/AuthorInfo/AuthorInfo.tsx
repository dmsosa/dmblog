import { useUser } from "../../hooks/useUser";
import { TUser } from "../../types/User";
import AuthorMeta from "./AuthorMeta";

function AuthorInfo({ username } : {
    username: string ;
}) {

    const { loading, author, following, setAuthor } = useUser({ username });

    const handleFollow = (author: TUser) => {
        setAuthor(author)
    }

    return (
        <>
            <AuthorMeta 
            author={author}
            loading={loading}
            following={following}
            handleFollow={handleFollow}/>
            
        </>
    )
}

export default AuthorInfo;