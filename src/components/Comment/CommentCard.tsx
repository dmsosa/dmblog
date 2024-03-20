import { useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { dateFormatter } from "../../helpers/helpers";
import { TComment } from "../../types/Comment";
import AuthorButtons from "./AuthorButtons";
import CommentAuthor from "./CommentAuthor";
import { TCommentData, editComment } from "../../service/commentService";

function CommentCard({ comment, setCommentData } : {
    comment: TComment,
    setCommentData: React.Dispatch<React.SetStateAction<TCommentData>>
}) {
    const [ edit, setEdit ] = useState(false);
    const [ form, setForm ] = useState(comment.body);
    const { authState } = useAuth() as TAuthContext;
    const { headers, loggedUser } = authState;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
        e.preventDefault();
        setForm(e.target.value);
    }
    const handleSubmit = (e: React.MouseEvent<HTMLFormElement> ) => {
        e.preventDefault();
        if (!headers) {
            alert("You need to login first!");
            return;
        }
        editComment({ headers, commentId: comment.id })
        .then()
    }
    return (
        <div className="col-12 comment-card" key={comment.id}>
            <CommentAuthor image={comment.image} username={comment.username} />
            <div className="comment-cont">
                { edit ? 
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <textarea
                        name="body"
                        rows={3}
                        value={form}
                        onChange={handleChange}
                        ></textarea>
                        <button className="btn btn-primary">Save changes</button>
                    </fieldset>
                </form>
                :
                <>
                    <p>{comment.body}</p>
                    <span>{dateFormatter(comment.updatedAt)}</span>
                </>
                            }

            </div>
            <div className="comment-footer">
            <button className="btn btn-info">Like</button>
                {loggedUser.username == comment.username && 
                <AuthorButtons edit={edit} setEdit={setEdit} handleDelete={setCommentData} />}
            </div>
        </div>
    )
}
export default CommentCard;