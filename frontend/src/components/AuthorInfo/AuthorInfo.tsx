import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TUser } from "../../types/User";
import AuthorMeta from "./AuthorMeta";
import { useEffect, useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { getUserByUsername } from "../../service/userService";
import { createApiError } from "../../service/errorHandler";

function AuthorInfo() {
  const { state } = useLocation();
  const { username } = useParams();
  const navigate = useNavigate();

  const { authState } = useAuth() as TAuthContext;
  const { headers } = authState;
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState(state || {});
  const { imageUrl, bio, isFollowing, followersCount } = author;

  useEffect(() => {
    if (!username) return;
    getUserByUsername({ headers, username })
      .then((author) => {
        setAuthor(author);
      })
      .catch((error) => {
        createApiError(error);
        navigate("/not-found");
      })
      .finally(() => setLoading(false));
  }, [headers, navigate, username]);

  const handleFollow = (author: TUser) => {
    setAuthor(author);
  };

  return loading ? (
    <div> Loading author info . . . </div>
  ) : (
    <div className="profile-info row row-cols-2">
      <AuthorMeta
        username={username || ""}
        loading={loading}
        imageUrl={imageUrl}
        followersCount={followersCount}
        isFollowing={isFollowing}
        handleFollow={handleFollow}
      />
      {bio && (
        <div className="profile-bio col col-12">
          <h1>Biography</h1>
          <p>{bio}</p>
        </div>
      )}
    </div>
  );
}

export default AuthorInfo;
