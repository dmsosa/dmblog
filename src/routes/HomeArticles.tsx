import ArticlePagination from "../components/ArticlePagination";
import ArticlePreview from "../components/ArticlePreview";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { TFeedContext, useFeed } from "../context/FeedContext";
import useArticle from "../hooks/useArticle";

function HomeArticles() {

    const articlesPerPage = 3;
    const { headers } = useAuth()?.authState || {headers: null} ;
    const {tabName, tagName } = useFeed() as TFeedContext;
    const { isLoading, articlesCount, articles, setArticlesData } = useArticle(
        {location: tabName,
        tabName,
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
            headers={headers}
            articlesCount={articlesCount}
            tabName={tabName}
            tagName={tagName}
            updateArticles={setArticlesData}
            />
        </> ) : (<div><em>No articles found</em></div>);
    
}

export default HomeArticles;