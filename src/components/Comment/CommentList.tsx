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
            <CommentCard comment={comment} setCommentData={setCommentData}/>
    )
})
    
    )
    
    : 
    
    <div>No comments yet</div>
}

export default CommentList; 