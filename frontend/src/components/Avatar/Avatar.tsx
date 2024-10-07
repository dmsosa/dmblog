import { useEffect, useState } from "react";
import LoadingSquare from "../Widgets/LoadingSquare";
import { Link } from "react-router-dom";
import { TUser } from "../../types/User";
function Avatar({
  imageUrl,
  username,
  profile = false,
  author,
}: {
  imageUrl: string;
  username: string;
  profile?: boolean;
  author?: TUser | null;
}) {
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //Check if there is an Image URL, if not, using defalt from S3 Bucket
    setLoading(true);
    if (!imageUrl || imageUrl.length < 1) {
      setSource(
        "https://dmblogbucket.s3.eu-west-2.amazonaws.com/icon/apple.svg"
      );
    } else {
      setSource(imageUrl);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [imageUrl]);

  return loading ? (
    <LoadingSquare />
  ) : (
    <Link className={`avatar ${profile && 'profile-avatar'}`} to={`/user/${username}`} state={author}>
        <img alt={`${username}'s profile image`} src={source}></img>
        <p>{username}</p>
    </Link>

  );
}

export default Avatar;
