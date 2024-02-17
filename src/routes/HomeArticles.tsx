import ArticlePagination from "../components/Article/ArticlePagination";
import ArticlePreview from "../components/Article/ArticlePreview";
import { TFeedContext, useFeed } from "../context/FeedContext";
import useArticle from "../hooks/useArticle";

function HomeArticles() {


    const {tabName, tagName } = useFeed() as TFeedContext;
    const { isLoading, articlesCount, articles, setArticlesData } = useArticle(
        {location: tabName,
        tagName}
    );
    return isLoading? (<div><em>Is Loading</em></div>) : articles.length > 0 ? (
        <>
            <ArticlePreview
            articles={articles}
            updateArticles={setArticlesData}
            isLoading={isLoading}
            />
            <ArticlePagination
            articlesCount={articlesCount}
            location={tabName}
            tagName={tagName}
            updateArticles={setArticlesData}
            />
        </> ) : (<div><em>No articles found</em></div>);
    
}

export default HomeArticles;