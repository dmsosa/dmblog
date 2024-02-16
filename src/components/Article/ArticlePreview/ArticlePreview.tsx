import { Link } from "react-router-dom";
import ArticleMeta from "../ArticleMeta";
import ArticleTags from "../ArticleTags";
import { TArticle } from "../../../types/Article";
import { TArticleData } from "../../../service/articleService";
import FavButton from "../../Buttons/FavButton";
import { useEffect } from "react";

function ArticlePreview({ headers, username, articles, isLoading, updateArticles } : { 
    headers: object | null, 
    username: string | null, 
    articles: TArticle[], 
    isLoading: boolean, 
    updateArticles: React.Dispatch<React.SetStateAction<TArticleData>> }) {
    

    const handleFav = (article: TArticle) => {
        const items = [...articles];
        const updatedArticles = items.map((item) => item.slug === article.slug ? {...item, ...article}: item);
        updateArticles((prev) => ({...prev, articles: updatedArticles}))
        
    }

    
    return articles.length > 0 ? articles.map((article) => 
        <div className="article-preview" key={article.title}>
            <ArticleMeta createdAt={article.createdAt} author={article.author}>
                <FavButton
                headers={headers}
                slug={article.slug}
                username={username}
                favoritesCount={article.favoritesCount}
                handleFav={handleFav}
                isFav={article.isFav}/>
            </ArticleMeta>
            <Link to={article.slug}>
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>read more...</span>
            </Link>
        </div>
    ) : isLoading? (<div className="article-preview"><h5 className="loading">Loading...</h5></div>) 
    : (<div className="article-preview"><h5>No articles available</h5></div>)
};

export default ArticlePreview;