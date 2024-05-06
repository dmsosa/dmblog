import { TComment } from "../../types/Comment";
import { TCommentData } from "../../service/commentService";
import CommentCard from "./CommentCard";



function CommentList({ comments, setCommentData } : {
    comments: TComment[],
    setCommentData: React.Dispatch<React.SetStateAction<TCommentData>>

}) {
    
    return comments.length > 0 ? 
    ( comments.map((comment) => { 
        return (
            <div className="col-12 comment-card" key={comment.id}>
                <CommentCard comment={comment} setCommentData={setCommentData}/>
            </div>
    )
})
    
    )
    
    : 
    
    <div className="no-comments">No comments yet</div>
}

export default CommentList; 