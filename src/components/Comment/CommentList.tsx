import { TComment } from "../../types/Comment";
import { dateFormatter } from "../../helpers/helpers";
import CommentAuthor from "./CommentAuthor";



function CommentList({ comments } : {
    comments: TComment[]

}) {
    


    return comments.length > 0 ? 
    ( comments.map((comment) => (
        !!comment.author && 
        <>
            <CommentAuthor image={""}/>
            <div className="col-8 comment-col">
                <div className="comment-author">
                    <img src=""/><a>{comment.author.username}</a>
                </div>
                <p>{comment.body}</p>
                <span>{dateFormatter(comment.updatedAt)}</span>
                <div className="comment-dropdown">
                    <button className="comment-dropbtn"></button>
                    <div className="comment-dropcontent">
                        <ul>
                            <li>Mark as fav</li>
                            <li>Edit</li>
                            <li>Delete</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
 ))
    
    )
    
    : 
    
    <div>No comments yet</div>
}

export default CommentList; 