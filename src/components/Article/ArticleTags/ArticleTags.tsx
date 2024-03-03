import { Link } from "react-router-dom";

function ArticleTags({tagList}: {tagList: string[]}) {
    return (
        tagList &&
        tagList.length > 0 && 
        (
            <ul className="tag-list">
                { tagList.map( (tag) => (
                        <li key={tag} className="tag-li">
                            <Link to={`tags/${tag}`}>
                                <p>{tag}</p>
                            </Link>
                        </li>
                        )
                    )
                }
            </ul>
        )
        
        
    );
}


export default ArticleTags;