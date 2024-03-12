import { useState } from "react";
import { toggleFollow } from "../../../service/userService";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { TUser } from "../../../types/User";

function FollowButton({ username, isFollowing, followersCount, handleFollow } : { 
    username: string,
    isFollowing: boolean,
    followersCount: number | null,
    handleFollow: (userData: TUser) => void}) {
    
    const [ loading, setLoading ] = useState(false);
    const { authState } = useAuth() as TAuthContext;
    const { headers } = authState;

    const classN = isFollowing ? "btn-danger" : "btn-primary"
    const text = isFollowing ? "Unfollow" : "Follow"
    const handleClick = () => {

        if (!headers) return alert("You need to login first!");
        setLoading(true);
        toggleFollow({headers, username, isFollowing})
        .then((author) => handleFollow(author))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }


    return (
        loading ? 
        <p>Loading...</p> :
        <div className="follow-row row">
        <button className={`col-12 btn-follow btn ${classN}`} onClick={handleClick}>
            {text}
        </button>
        <span className="col-12">Followers: {followersCount}</span>
        </div>

        
    )
}

export default FollowButton;