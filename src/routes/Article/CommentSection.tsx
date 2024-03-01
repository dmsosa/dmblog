import { useState } from "react";
import ColContent from "../../components/ColContent";
import { TComment } from "../../types/Comment";
import ContainerRow from "../../components/ContainerRow";
import { dateFormatter } from "../../helpers/helpers";
import CommentList from "../../components/Comment/CommentList";
import { useParams } from "react-router-dom";
import useComment from "../../hooks/useComment";

function CommentSection() {

    const { slug } = useParams();
    const { loading, comments, commentsCount, setCommentData } = useComment({ slug });

    return (
        <div className="row row-cols-3 comment-row">
            <div className="col col-12">Comment editor</div>
            <CommentList comments={comments}/>
        </div>
    )
}
export default CommentSection;