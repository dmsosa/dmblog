import Avatar from "../Avatar";
import FollowButton from "../Buttons/FollowButton/FollowButton";
import { TUser } from "../../types/User";
import { Link } from "react-router-dom";
import { TAuthContext, useAuth } from "../../context/AuthContext";

function AuthorMeta({ username, image, followersCount, isFollowing, loading, handleFollow } : {
    username: string,
    image: string,
    followersCount: number, 
    isFollowing: boolean, 
    loading: boolean,
    handleFollow: (author: TUser) => void
}) {
    
    const { authState } = useAuth() as TAuthContext;
    const { loggedUser } = authState;
    return loading ? ( <div>Loading</div>) : ( 
        <>
            <div className="author-avatar col col-md-6 col-12">
                <Avatar src={image} addClass="author-avatar"/>
                <a href="" className="author-username">{username}</a>
            </div>
            <div className="author-buttons col col-md-6 col-12 ">
                <FollowButton 
                username={username}
                followersCount={followersCount}
                isFollowing={isFollowing}
                handleFollow={handleFollow}
                >
                </FollowButton>
                { loggedUser.username === username ? 
                <button className="btn btn-info">
                    <Link to={"/settings"}> Edit profile</Link>
                </button> : 
                <button className="btn btn-danger">Report</button>
            }
            </div>
        </>
    )
}

export default AuthorMeta;