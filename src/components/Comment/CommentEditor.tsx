import { ChangeEvent, FormEvent, useState } from "react";
import CommentAuthor from "./CommentAuthor";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { TCommentData, postComment } from "../../service/commentService";
import { errorHandler } from "../../service/handleError";

function CommentEditor({ setCommentData } : {
    setCommentData: React.Dispatch<React.SetStateAction<TCommentData>>
}) {

    const { authState } = useAuth() as TAuthContext;
    const { headers, isAuth, loggedUser } = authState;
    const { slug } = useParams();
    const [ body, setBody ] = useState("");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        if (!headers) return;
        postComment({ body, headers, slug })
        .then((commentData) => {
            setCommentData(commentData);
        })
        .catch((error) => errorHandler(error))
    }


    return isAuth ?
        <div className="col col-12">
            <form className="comment-card comment-form" onSubmit={handleSubmit}>
                <div className="comment-cont">
                    <label>Leave a comment</label>
                    <textarea
                    rows={4}
                    placeholder="What do you have to comment?..."
                    onChange={handleChange}
                    value={body}
                    name="body">
                    </textarea>
                </div>
                <div className="comment-footer">
                    <CommentAuthor image={loggedUser.image} username={loggedUser.username}/>
                    <button>Post comment</button>
                </div>
            </form>            
        </div> : 
        <div className="col col-12">
            <h5>You need an account to leave a comment</h5>
            <div className="col-6">
                <Link to={"/login"}>
                    Log into your account
                </Link>
            </div>
            <div className="col-6">
                <Link to={"/signin"}>
                    Sign in to create an account
                </Link>
            </div>
        </div>
    
}

export default CommentEditor;