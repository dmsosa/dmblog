import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

function AuthorButtons({
  edit,
  setEdit,
  handleDelete,
}: {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}) {
  const [dropdown, setDropdown] = useState(false);
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleClick = () => {
    setDropdown(!dropdown);
  };
  return (
    <div className="comment-dropdown">
      <button className="comment-dropbtn" onClick={handleClick}>
        <BsThreeDots size={25} color={"white"} />
      </button>
      <div className={`comment-dropdown-content ${dropdown ? "show" : ""}`}>
        <ul>
          <li>
            <a role="button" onClick={handleEdit}>
              Edit
            </a>
          </li>
          <li>
            <a role="button" onClick={handleDelete}>
              Delete
            </a>
          </li>
          <li>
            <a role="button">Hide</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AuthorButtons;
