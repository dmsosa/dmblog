import ArticlePagination from "../components/ArticlePagination";
import ArticlePreview from "../components/ArticlePreview";
import { TFeedContext, useFeed } from "../context/FeedContext";

function HomeArticles() {

    const {tabName, tagName } = useFeed() as TFeedContext;
    const { isLoading, articleCount, articles, setArticlesData } = useArticleList(
        {location: tabName,
        tagName: tagName}
    );

    return isLoading? (<div><em>Is Loading</em></div>) : articles.length > 0 ? (
        <>
            <ArticlePreview/>
            <ArticlePagination 
            />
        </> ) : (<div><em>No articles found</em></div>);
    
}

export default HomeArticles;