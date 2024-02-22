import { useState } from "react";
import { toggleFollow } from "../../../service/userService";
import { TAuthContext, useAuth } from "../../../context/AuthContext";

function FollowButton({ username, isFollowing, followersCount, handleFollow } : { 
    username: string,
    isFollowing: boolean,
    followersCount: number | null,
    handleFollow: (isFollowing: boolean) => void}) {
    
    const [ loading, setLoading ] = useState(false);
    const { authState } = useAuth() as TAuthContext;
    const { headers, isAuth } = authState;

    const classN = isFollowing ? "btn-unfollow" : "btn-follow"
    const text = isFollowing ? "Unfollow" : "Follow"
    const handleClick = () => {

        if (!isAuth) return alert("You need to login first!");
        setLoading(true);
        toggleFollow({headers, username, isFollowing})
        .then((userData) => handleFollow(userData))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }


    return (
        loading ? 
        <p>Loading...</p> :
        <button className={`btn ${classN}`} onClick={handleClick}>
            {text}
            <span>Followers: {followersCount}</span>
        </button>
    )
}

export default FollowButton;