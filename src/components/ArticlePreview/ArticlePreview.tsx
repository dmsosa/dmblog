import { useState } from "react";

function ArticlePreview() {
    const sampleArticles = [...Array(33).keys()];
    const [articles, setArticles] = useState(sampleArticles);
    
    return (
        <div className="container article-cont">
            {articles.map( (article) => (
                <div className="row article-row">
                    <h1>{article}</h1>
                </div>
            ))}
        </div>
    )
};

export default ArticlePreview;