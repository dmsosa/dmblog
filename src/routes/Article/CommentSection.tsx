import { useState } from "react";
import ColContent from "../../components/ColContent";
import { TComment } from "../../types/Comment";
import ContainerRow from "../../components/ContainerRow";
import { dateFormatter } from "../../helpers/helpers";

function CommentSection() {
    const [ comments, setComments ] = useState<TComment[]>();

    return (
        <div className="row">
            {comments && comments.map((com) => (
                <div className="col">
                    {com.body}
                    <span>Posted at {dateFormatter(com.postedAt)}</span>
                    <span>Updated at {dateFormatter(com.updatedAt)}</span>
                </div>
                
            ))}
        </div>
    )
}
export default CommentSection;