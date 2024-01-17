
function BlogTag({ tags } : { tags: string | string[] }) {
    return (
        <ul className="blog-tag-container">
            <li className="blog-tag"></li>
        </ul>
    );
}

export default BlogTag;