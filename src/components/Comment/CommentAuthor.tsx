import Avatar from "../Avatar";

function CommentAuthor({ image }:  {
    image:string
}) {
    return (
        <div className="col-4 comment-author">
            <Avatar src={image} />
        </div>
    )
}

export default CommentAuthor;