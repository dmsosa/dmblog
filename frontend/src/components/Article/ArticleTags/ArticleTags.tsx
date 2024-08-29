import { Link } from "react-router-dom";

function ArticleTags({ tagList }: { tagList: string[] }) {
  return (
    tagList &&
    tagList.length > 0 && (
      <div className="tag-list">
        <span>Tags</span>
        <ul>
          {tagList.map((tag) => (
            <li key={tag} className="tag-li">
              <Link to={`tags/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default ArticleTags;
