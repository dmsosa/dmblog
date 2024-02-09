import { Link } from "react-router-dom";
import ContainerRow from "../ContainerRow";
import Avatar from "../Avatar";
import { dateFormatter } from "../../helpers/dateFormatter";
import { TUser } from "../../types/User";
import { ReactNode } from "react";


function ArticleMeta({ children, createdAt, author }: { children: ReactNode | ReactNode[] ,createdAt: Date, author: TUser }) {

    const { bio, followersCount, following, image, username } = author || {};

    return (
        <ContainerRow
        addClass={"article-meta"}>
            <Link
                className="col article-author"
                state={{bio, followersCount, following, image }}
                to={`/profile/${username}`}
            >
                <Avatar 
                    alt={username ? `Author: ${username}` : null}
                    src={image? image : null }
                />
            </Link>
            <div className="col article-info">
                <Link
                    className="col article-author"
                    state={{bio, followersCount, following, image }}
                    to={`/profile/${username}`}
                >
                    {username}
                </Link> 
                <span className="col article-date">{dateFormatter(createdAt)}</span>
            </div>
            <div className="col article-fav">{children}</div>
        </ContainerRow>
        
    )
}

export default ArticleMeta;