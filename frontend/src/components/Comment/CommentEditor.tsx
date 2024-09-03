import { ChangeEvent, FormEvent, useState } from "react";
import CommentAuthor from "./CommentAuthor";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { TCommentData, postComment } from "../../service/commentService";
import { createApiError } from "../../service/errorHandler";

function CommentEditor({
  setCommentData,
}: {
  setCommentData: React.Dispatch<React.SetStateAction<TCommentData>>;
}) {
  const { authState } = useAuth() as TAuthContext;
  const { headers, isAuth, loggedUser } = authState;
  const { slug } = useParams();
  const [body, setBody] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!headers) return;
    postComment({ body, headers, slug })
      .then((commentData) => {
        setCommentData(commentData);
      })
      .catch((error) => createApiError(error));
  };

  return isAuth ? (
    <div className="row col-12">
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="comment">Leave a comment</label>
        <textarea
          id="comment"
          rows={4}
          placeholder="What do you have to comment?..."
          onChange={handleChange}
          value={body}
          name="body"
        ></textarea>
        <div className="comment-footer">
          <CommentAuthor
            image={"loggedUser.image"}
            username={loggedUser.username}
          />
          <button className="btn btn-primary">Post comment</button>
        </div>
      </form>
    </div>
  ) : (
    <div className="row col-12 comment-unlogged">
      <div className="col-12">
        <h5>You need an account to leave a comment</h5>
      </div>
      <div className="col-6 comment-link">
        <Link to={"/dmblog/login"}>Log into your account</Link>
      </div>
      <div className="col-6 comment-link">
        <Link to={"/dmblog/signup"}>Sign in to create an account</Link>
      </div>
    </div>
  );
}

export default CommentEditor;
