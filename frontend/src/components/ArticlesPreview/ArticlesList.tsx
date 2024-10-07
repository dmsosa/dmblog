import { TArticle } from "../../types/Article";
import { Link } from "react-router-dom";
import MetaInfo from "../MetaInfo/MetaInfo";
import { TArticleData } from "../../service/articleService";
import { TUser } from "../../types/User";

function ArticlesList({ articles, setArticlesData }: { articles: TArticle[], setArticlesData: React.Dispatch<React.SetStateAction<TArticleData>> }) {

    
    const handleFollow = (author: TUser) => {
        let updatedArticles = articles.map((a) => {
            if (a.author.id === author.id) {
                a.author = author;
            }
            return a;
        })
        setArticlesData((prev) => ({...prev, articles: updatedArticles}));
    }

    const handleFav = (article: TArticle) => {
        let updatedArticles = articles.map((a) => {
            if (a.id === article.id) {
                return article;
            }
            return a;
        })
        setArticlesData((prev) => ({...prev, articles: updatedArticles}));
    }
    return articles.map((article) => (
        <div className="article-item container" key={article.slug}>
            <div className="row article-item--info">
                <MetaInfo article={article} handleFollow={handleFollow} handleFav={handleFav}/>
            </div>
            <Link className="article-item--readmore" to={`/article/${article.slug}`} state={article}>
                <h1>{article.title}</h1>
                <p>{article.body}</p>
                <span>read more...</span>
            </Link>
        </div>
    ))
}

export default ArticlesList;