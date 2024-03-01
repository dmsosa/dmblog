import { useEffect, useState } from "react";
import { TComment } from "../types/Comment";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { TCommentData, getCommentsOfArticle } from "../service/commentService";
import { getUserById } from "../service/userService";
import { errorHandler } from "../service/handleError";

function useComment({ slug } : {
    slug: string | undefined
}) {
    const [ loading, setLoading ] = useState(false);
    const [ { comments, commentsCount }, setCommentData ] = useState<TCommentData>({ comments: [], commentsCount: 0 });


    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        getCommentsOfArticle({ slug }).then((commentData) => {
            commentData.comments = commentData.comments.map((comment) => {
                getUserById({ userId: comment.userId })
                .then((author) => { comment.author = author })
                .catch((error) => errorHandler(error))

                return comment
            })
            setCommentData(commentData)
        })
        .finally(() => setLoading(false))

    }, [ slug ])

    return { loading, comments, commentsCount, setCommentData };
}

export default useComment;