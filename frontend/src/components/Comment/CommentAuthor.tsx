import { Link } from "react-router-dom";
import Avatar from "../Avatar";

function CommentAuthor({
  image,
  username,
}: {
  image: string;
  username: string;
}) {
  return (
    <div className="comment-author">
      <Link to={`/dmblog/profile/${username}`}>
        <Avatar imageUrl={image} username={username} />
        <span>{username}</span>
      </Link>
    </div>
  );
}

export default CommentAuthor;
