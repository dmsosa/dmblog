import ArticlePagination from "../../components/Article/ArticlePagination";
import ArticlePreview from "../../components/Article/ArticlePreview";
import { useParams } from "react-router-dom";
import useArticle from "../../hooks/useArticle";

function ProfileFavArticles() {
  const { username } = useParams();

  const { articles, articlesCount, isLoading, setArticlesData } = useArticle({
    location: "favs",
    username,
    tagName: "",
  });

  return (
    <div className="article-box">
      <ArticlePreview
        isLoading={isLoading}
        articles={articles}
        updateArticles={setArticlesData}
      ></ArticlePreview>
      <ArticlePagination
        location="favs"
        username={username}
        tagName={""}
        articlesCount={articlesCount}
        updateArticles={setArticlesData}
      ></ArticlePagination>
    </div>
  );
}

export default ProfileFavArticles;
