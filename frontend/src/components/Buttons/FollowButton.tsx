import { MouseEvent, useState } from "react";
import { TUser } from "../../types/User";
import { toggleFollow } from "../../service/userService";
import { ApiError } from "../../service/errorHandler";

function FollowButton({
  headers,
  username,
  isFollowing,
  handleFollow,

}: {
  headers: object | null,
  username: string,
  isFollowing: boolean,
  handleFollow: (author: TUser) => void  
}) {  
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!headers) return alert("You need to login first!");

    setLoading(true);

    toggleFollow({headers, username, isFollowing})
    .then((author: TUser) => {
      handleFollow(author);
    })
    .catch((error: ApiError) => console.log(error.getDefaultMessage()))
    .finally(() => setLoading(false));
  }
  const ChangeTextToFollowing = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.innerText = "Unfollow";
  }
  const ChangeTextToUnfollow = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.innerText = "Unfollow";
  }

  return ( loading ?
    <div>loading</div>
    :
    isFollowing ? 
    <button className="btn btn-secondary" onClick={handleClick}
    onMouseOver={ChangeTextToFollowing}
    onMouseLeave={ChangeTextToUnfollow}>
      Following
    </button> :
    <>
<button type="button" className="btn">Def</button>
<button type="button" className="btn btn-primary">Primary</button>
<button type="button" className="btn btn-secondary">Secondary</button>
<button type="button" className="btn btn-success">Success</button>
<button type="button" className="btn btn-danger">Danger</button>
<button type="button" className="btn btn-warning">Warning</button>
<button type="button" className="btn btn-info">Info</button>
<button type="button" className="btn btn-light">Light</button>
<button type="button" className="btn btn-dark">Dark</button>

<button type="button" className="btn btn-link">Link</button>
    </>

  

  )

      ;
}

export default FollowButton;
