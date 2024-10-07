import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TUser } from "../../../types/User";
import { useEffect, useState } from "react";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { getUserByUsername, logoutUser } from "../../../service/userService";
import { ApiError } from "../../../service/errorHandler";
import FollowButton from "../../Buttons/FollowButton";
import Avatar from "../../Avatar";

const initUser: TUser = {
  id: null,
  username: "",
  email: "",
  password: "",
  bio: "",
  imageUrl: "",
  backgroundImageUrl: "",
  icon: "apple",
  backgroundColor: "#DFFF00",
  followersCount: 0,
  followingCount: 0,
  followers: null,
  following: null,
  createdAt: null,
  updatedAt: null,
  isFollowing: false,
}

function AuthorInfo() {
  const { state } = useLocation();
  const { username } = useParams();
  const navigate = useNavigate();

  const { authState, setAuthState } = useAuth() as TAuthContext;
  const { headers, loggedUser } = authState;

  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState<TUser>(state || initUser);

  const { backgroundImageUrl, backgroundColor } = author;
  const source = backgroundImageUrl && backgroundImageUrl.length > 0 ? backgroundImageUrl : null;

  useEffect(() => {
    if (state || !username) return;

    
    getUserByUsername({ username })
      .then((author: TUser) => {
        setAuthor(author);
      })
      .catch((error: ApiError) => {
        if (error.getStatusCode() === 406) {
          alert("Token expired, please login again!");
          setAuthState(logoutUser());
          navigate("/");
        } else  {
          navigate("/not-found", { replace: true });
        };
      })
      .finally(() => setLoading(false));
  }, [headers, navigate, username]);

  const handleFollow = (updatedAuthor: TUser) => {
    setAuthor(updatedAuthor);
  }

  return loading ? (
    <div> Loading author info . . . </div>
  ) : (
    <>
      <div className="row">
        <div className="profile-bg" style={{backgroundColor: backgroundColor}}>
          {source && <img src={source}/>}
        </div>
      </div>
      <div className="row">
        <Avatar 
        imageUrl=""
        username={author.username}
        profile={true}
        />
      </div>
      <div className="row">
        {loggedUser.username === username ?
          <div>P Buttons</div>
          :
          <FollowButton 
          headers={headers}
          username={author.username}
          isFollowing={author.isFollowing}
          handleFollow={handleFollow}
          />
        }
      </div>
      <div className="row">
          <h1>bio</h1>
          <p>{author.bio}</p>
      </div>
    </>
    
  );
}

export default AuthorInfo;
