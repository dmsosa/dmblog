import { TComment } from "../../types/Comment";
import { dateFormatter } from "../../helpers/helpers";
import CommentAuthor from "./CommentAuthor";
import { MouseEvent } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import AuthorButtons from "./AuthorButtons";



function CommentList({ comments } : {
    comments: TComment[]

}) {

    const { authState } = useAuth() as TAuthContext;
    const { loggedUser } = authState;
    

    return comments.length > 0 ? 
    ( comments.map((comment) => { 
        return (
        <div className="col-12 comment-card" key={comment.id}>
            <CommentAuthor image={comment.image} username={comment.username} />
            <div className="comment-cont">
                <p>{comment.body}</p>
                <span>{dateFormatter(comment.updatedAt)}</span>
            </div>
            <div className="comment-footer">
                {loggedUser.username == comment.username && 
                <AuthorButtons id={comment.id} />}
                <button>Like</button>
            </div>
        </div>
    )
})
    
    )
    
    : 
    
    <div>No comments yet</div>
}

export default CommentList; 