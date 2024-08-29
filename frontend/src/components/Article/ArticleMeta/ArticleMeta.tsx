import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import { TUser } from "../../../types/User";
import { ReactNode } from "react";

function ArticleMeta({
  children,
  author,
  bottom = false,
}: {
  children?: ReactNode | ReactNode[];
  author: TUser;
  bottom?: boolean;
}) {
  const { bio, followersCount, followingCount, imageUrl, username } =
    author || {};

  return (
    <div className={`article-meta ${bottom ? "bottom" : ""}`}>
      <Link
        className="article-author"
        state={{ bio, followersCount, followingCount, imageUrl }}
        to={`/dmblog/profile/${username}`}
      >
        <Avatar username={username} imageUrl={imageUrl} />
        <p>{username}</p>
      </Link>
      {children}
    </div>
  );
}

export default ArticleMeta;
