import { Link, useNavigate } from "react-router-dom";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { deleteArticle } from "../../../service/articleService";
import { TArticle } from "../../../types/Article";
import BackgroundPopUp from "../PopUpButtons/BackgroundPopUp";
import FontColorPopUp from "../PopUpButtons/FontColorPopUp";
import EmojisPopUp from "../PopUpButtons/EmojisPopUp";

function AuthorButtons({
  article,
  handleFieldChange
}: {
  article: TArticle;
  handleFieldChange: (article: TArticle) => void;
}) {
  const { authState } = useAuth() as TAuthContext;
  const  headers  = authState.headers as object;
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!headers) return alert("You need to login first!");
    if (article.slug.length < 1)
      return console.log(`Article with slug ${article.slug} does not exists!`);
    const confirm = window.confirm("Are you sure to delete?");
    if (!confirm) {
      return;
    }
    deleteArticle({ slug: article.slug, headers })
      .then((message) => {
        alert(message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
          <>
            <Link
            className="btn btn-edit"
            state={article}
            to={`/editor/${article.slug}`}
            >
              Edit
            </Link>
            <BackgroundPopUp 
            headers={headers}
            slug={article.slug}
            backgroundColor={article.backgroundColor}
            handleBackgroundColorChange={handleFieldChange}
            />
            <FontColorPopUp 
            headers={headers}
            slug={article.slug}
            fontColor={article.fontColor}
            handleFontColorChange={handleFieldChange}
            />
            <EmojisPopUp 
            headers={headers}
            slug={article.slug}
            handleEmojiChange={handleFieldChange}
            />
            <button className="btn btn-danger col-3" onClick={handleDelete}>
              Delete
            </button>
          </>
  );
}

export default AuthorButtons;
