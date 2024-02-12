import ArticlePagination from "../components/ArticlePagination";
import ArticlePreview from "../components/ArticlePreview";
import {  TAuthContext, useAuth } from "../context/AuthContext";
import { TFeedContext, useFeed } from "../context/FeedContext";
import useArticle from "../hooks/useArticle";

function HomeArticles() {

    const { authState } = useAuth() as TAuthContext;
    const { headers, loggedUser } = authState;
    const {tabName, tagName } = useFeed() as TFeedContext;
    const { isLoading, articlesCount, articles, favArticles, setArticlesData } = useArticle(
        {location: tabName,
        headers: headers,
        username: loggedUser.username,
        tabName,
        tagName}
    );
    return isLoading? (<div><em>Is Loading</em></div>) : articles.length > 0 ? (
        <>
            <ArticlePreview
            headers={headers}
            username={loggedUser.username}
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