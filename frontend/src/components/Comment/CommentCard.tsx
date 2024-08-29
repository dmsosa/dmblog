import { useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { dateFormatter } from "../../helpers/helpers";
import { TComment } from "../../types/Comment";
import AuthorButtons from "./AuthorButtons";
import CommentAuthor from "./CommentAuthor";
import {
  TCommentData,
  deleteComment,
  editComment,
} from "../../service/commentService";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

function CommentCard({
  comment,
  setCommentData,
}: {
  comment: TComment;
  setCommentData: React.Dispatch<React.SetStateAction<TCommentData>>;
}) {
  const { slug } = useParams();
  const [edit, setEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [commentBody, setCommentBody] = useState(comment.body);
  const { authState } = useAuth() as TAuthContext;
  const { headers, loggedUser } = authState;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCommentBody(e.target.value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!slug) return;
    if (!headers) {
      alert("You need to login first!");
      return;
    }
    console.log(comment);

    editComment({ headers, commentId: comment.id, slug, body: commentBody })
      .then((commentData) => setCommentData(commentData))
      .catch((error: AxiosError) => {
        console.log(error);
        setErrorMessage(error.message);
      })
      .finally(() => setEdit(!edit));
  };

  const handleDelete = () => {
    if (!slug) return;
    if (!headers) {
      alert("You need to login first!");
      return;
    }
    deleteComment({ headers, commentId: comment.id, slug })
      .then((commentData) => setCommentData(commentData))
      .catch((error: AxiosError) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };
  return (
    <>
      <CommentAuthor image={comment.image} username={comment.username} />
      <div className="comment-cont">
        {edit ? (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <textarea
                name="body"
                rows={3}
                value={commentBody}
                onChange={handleChange}
              ></textarea>
              <button className="btn btn-primary">Save changes</button>
            </fieldset>
          </form>
        ) : (
          <>
            <p>{comment.body}</p>
            <span>{dateFormatter(comment.updatedAt)}</span>
          </>
        )}
      </div>
      <div className="comment-footer">
        {errorMessage.length > 0 && (
          <p className="error-message">{errorMessage}</p>
        )}
        <button className="btn btn-info">Like</button>
        {loggedUser.username == comment.username && (
          <AuthorButtons
            edit={edit}
            setEdit={setEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}
export default CommentCard;
