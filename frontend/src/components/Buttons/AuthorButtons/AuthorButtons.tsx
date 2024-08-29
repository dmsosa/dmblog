import { Link, useNavigate } from "react-router-dom";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { deleteArticleBySlug } from "../../../service/articleService";
import { TArticle } from "../../../types/Article";
import { PopUpColors, PopUpEmojis } from "./PopUpButtons";

function AuthorButtons({
  title,
  body,
  description,
  tagList,
  slug,
  fontColor,
  backgroundColor,
  setArticleWithNewFields,
}: {
  title: string;
  body: string;
  description: string;
  tagList: string[];
  slug: string;
  fontColor: string | null;
  backgroundColor: string | null;
  emoji: string | null;
  setArticleWithNewFields: (article: TArticle) => void;
}) {
  const { authState } = useAuth() as TAuthContext;
  const { headers, isAuth } = authState;
  const navigate = useNavigate();


  const handleDelete = () => {
    if (!isAuth) return alert("You need to login first!");
    if (slug.length < 1)
      return console.log(`Article with slug ${slug} does not exists!`);
    const confirm = window.confirm("Are you sure to delete?");
    if (!confirm) {
      return;
    }
    deleteArticleBySlug({ slug, headers })
      .then((message) => {
        alert(message);
        navigate("/dmblog");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="author-buttons row gx-5">
      <Link
        className="nav-link col-3"
        state={{ title, body, description, tagList }}
        to={`/dmblog/editor/${slug}`}
      >
        <button className="btn">Edit</button>
      </Link>
      <PopUpEmojis
        slug={slug}
        setArticleWithNewFields={setArticleWithNewFields}
      />
      <PopUpColors
        slug={slug}
        backgroundColor={backgroundColor}
        fontColor={fontColor}
        setArticleWithNewFields={setArticleWithNewFields}
      />
      <button className="btn btn-danger col-3" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default AuthorButtons;
