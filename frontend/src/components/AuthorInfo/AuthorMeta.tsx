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
            <div className="profile-avatar col col-md-6 col-12">
                <Avatar image={image} username={username}/>
                <a href="" className="profile-username">{username}</a>
            </div>
            <div className="profile-buttons col col-md-6 col-12 ">
                <FollowButton 
                username={username}
                followersCount={followersCount}
                isFollowing={isFollowing}
                handleFollow={handleFollow}
                >
                </FollowButton>
                { loggedUser.username === username ? 
                <div className="author-buttons row">
                    <Link to={"/dmblog/editor"}>
                        <button className="col col-12 btn btn-primary">
                            New Article
                        </button>
                    </Link>
                    <Link to={"/dmblog/settings"}> 
                        <button className="col col-12 btn btn-info">
                            Edit profile
                        </button>
                    </Link>
                </div> : 
                <button className="btn btn-danger">Report</button>
            }
            </div>
        </>
    )
}

export default AuthorMeta;