import ArticlePagination from "../components/ArticlePagination";
import ArticlePreview from "../components/ArticlePreview";

function HomeArticles() {
    return (
        <>
            <ArticlePreview/>
            <ArticlePagination articlesPerPage={}/>
        </>

    )
}

export default HomeArticles;