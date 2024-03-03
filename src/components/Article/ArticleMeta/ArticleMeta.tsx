import { Link } from "react-router-dom";
import ContainerRow from "../../ContainerRow";
import Avatar from "../../Avatar";
import { dateFormatter } from "../../../helpers/helpers";
import { TUser } from "../../../types/User";
import { ReactNode } from "react";


function ArticleMeta({ children, createdAt, author }: { 
    children: ReactNode | ReactNode[],
    createdAt?: Date | null, 
    author: TUser }) {

    const { bio, followersCount, followingCount, image, username } = author || {};

    return (
        <div className="article-meta row row-cols-2">
            <Link
                className="col-4 article-author"
                state={{bio, followersCount, followingCount, image }}
                to={`/profile/${username}`}
            >
                <Avatar 
                    alt={username ? `Author: ${username}` : null}
                    src={image? image : null }
                />
                <a>{username}</a>
                <span>{dateFormatter(createdAt)}</span>
            </Link>
            <div className="col-8 article-fav">{children}</div>
        
        </div> 
    )
}

export default ArticleMeta;