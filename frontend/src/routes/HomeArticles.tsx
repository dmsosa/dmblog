import ArticlePagination from "../components/Article/ArticlePagination";
import { TTagsContext, useTags } from "../context/TagsContext";
import useArticle from "../hooks/useArticle";

function HomeArticles() {
  const { tags, setTags } = useTags() as TTagsContext;
  const { isLoading, articlesCount, articles, setArticlesData } = useArticle({
    location: "global",
    tags,
  });
  return isLoading ? (
    <div>
      <em>Is Loading</em>
    </div>
  ) : articles.length > 0 ? (
    <>
      <ArticlePagination
        articlesCount={articlesCount}
        tags={tags}
        updateArticles={setArticlesData}
      />
    </>
  ) : (
    <div>
      <em>No articles found</em>
    </div>
  );
}

export default HomeArticles;
