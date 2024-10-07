import { Link } from "react-router-dom";
import { TUser } from "../../../types/User";

function ProfileButtons({ author } : { author: TUser }) {
    const handleDelete = () => {
        
    }
    return (
        <>
            <Link to={`/settings/${author.username}`} state={author}>Edit</Link>
            <Link to={`/editor`}>New Article</Link>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}

export default ProfileButtons;