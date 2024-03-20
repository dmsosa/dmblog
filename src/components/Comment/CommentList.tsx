import { TComment } from "../../types/Comment";
import { dateFormatter } from "../../helpers/helpers";
import CommentAuthor from "./CommentAuthor";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import AuthorButtons from "./AuthorButtons";
import { TCommentData } from "../../service/commentService";
import CommentCard from "./CommentCard";



function CommentList({ comments, setCommentData } : {
    comments: TComment[],
    setCommentData: React.Dispatch<React.SetStateAction<TCommentData>>

}) {
    const { authState } = useAuth() as TAuthContext;
    const { loggedUser } = authState;
    

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