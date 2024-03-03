import Avatar from "../Avatar";
import FollowButton from "../Buttons/FollowButton/FollowButton";
import { TUser } from "../../types/User";

function AuthorMeta({ username, image, followersCount, isFollowing, loading, handleFollow } : {
    username: string,
    image: string,
    followersCount: number, 
    isFollowing: boolean, 
    loading: boolean,
    handleFollow: (author: TUser) => void
}) {
    

    return loading ? ( <div>Loading</div>) : ( 
        <>
            <div className="col col-6">
                <Avatar src={image} addClass="author-avatar"/>
                <a href="" className="author-username">{username}</a>
            </div>
            <div className="col col-6">
                <FollowButton 
                username={username}
                followersCount={followersCount}
                isFollowing={isFollowing}
                handleFollow={handleFollow}
                >

                </FollowButton>
            </div>
        </>
    )
}

export default AuthorMeta;