import { useEffect, useState } from "react";
import ColContent from "../../components/ColContent";
import { TComment } from "../../types/Comment";
import ContainerRow from "../../components/ContainerRow";
import { dateFormatter } from "../../helpers/helpers";
import CommentList from "../../components/Comment/CommentList";
import { useParams } from "react-router-dom";
// import useComment from "../../hooks/useComment";
import { TCommentData, getCommentsOfArticle } from "../../service/commentService";
import CommentEditor from "../../components/Comment/CommentEditor";

function CommentSection() {

    const { slug } = useParams();
    const [ loading, setLoading ] = useState(false);
    const [ { comments, commentsCount }, setCommentData ] = useState<TCommentData>({ comments: [], commentsCount: 0 });

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        getCommentsOfArticle({ slug }).then((commentData) => {setCommentData(commentData)})
        .finally(() => setLoading(false))

    }, [ slug ])
    return (
        loading ? <div>is Loading</div> : 
        <div className="row row-cols-3 comment-row">
            <div className="col col-12 comment-count">Comments Count: {commentsCount}</div>
            <CommentEditor setCommentData={setCommentData}/>
            <hr></hr>
            <CommentList comments={comments} setCommentData={setCommentData}/>
        </div>
    )
}
export default CommentSection;