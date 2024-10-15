import { MouseEvent, useState } from "react";
import { TUser } from "../../types/User";
import { toggleFollow } from "../../service/userService";
import { ApiError } from "../../service/errorHandler";
import { Button } from "react-bootstrap";

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
      <Button variant="primary">Follow</Button>
    </>

  

  )

      ;
}

export default FollowButton;
