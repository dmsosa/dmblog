import Avatar from "../Avatar";
import FollowButton from "../Buttons/FollowButton/FollowButton";
import { TUser } from "../../types/User";

function AuthorMeta({ author, loading, following, handleFollow } : {
    author: TUser | undefined
    loading: boolean,
    following: boolean,
    handleFollow: (author: TUser) => void
}) {
    

    return loading ? ( <div>Loading</div>) : ( !!author &&
        <>

            <div className="col">
                <Avatar src={author.image} addClass="author-avatar"/>
                <a href={`profile/${author.username}`} className="author-username">{author.username}</a>
            </div>
            <div className="col">
                <FollowButton 
                username={author.username}
                followersCount={author.followersCount}
                isFollowing={following}
                handleFollow={handleFollow}
                >

                </FollowButton>
            </div>
        </>
    )
}

export default AuthorMeta;