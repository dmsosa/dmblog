import { Link } from "react-router-dom";
import ArticleMeta from "../ArticleMeta";
import { TArticle } from "../../../types/Article";
import { TArticleData } from "../../../service/articleService";
import FavButton from "../../Buttons/FavButton";

function ArticlePreview({  articles, isLoading, updateArticles } : { 
    articles: TArticle[], 
    isLoading: boolean, 
    updateArticles: React.Dispatch<React.SetStateAction<TArticleData>> }) {
    

    const handleFav = (article: TArticle) => {
        const items = [...articles];
        const updatedArticles = items.map((item) => item.slug === article.slug ? {...item, ...article}: item);
        updateArticles((prev) => ({...prev, articles: updatedArticles}))
        
    }

    
    return articles.length > 0 ? articles.map((article) => 
        <div className="article-preview container" key={article.title}>
            <div className="row">
                <ArticleMeta createdAt={article.createdAt} author={article.author}>
                    <FavButton
                    slug={article.slug}
                    favoritesCount={article.favoritesCount}
                    handleFav={handleFav}
                    isFav={article.isFav}/>
                </ArticleMeta>
                <div className="col article-link">
                    <Link to={`/dmblog/article/${article.slug}`} state={article}>
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>read more...</span>
                    </Link>
                </div>
            </div>
        </div>
    ) : isLoading? (<div className="article-preview"><h5 className="loading">Loading...</h5></div>) 
    : (<div className="article-preview"><h5>No articles available</h5></div>)
};

export default ArticlePreview;