import { useState } from "react";
import ArticlePagination from "../../components/Article/ArticlePagination";
import ArticlePreview from "../../components/Article/ArticlePreview";
import useArticle from "../../hooks/useArticle";
import { useParams } from "react-router-dom";

function ProfileArticles() {

    const { username } = useParams();
    const [ tagName, setTagName ] = useState("");
    const { articles, articlesCount, isLoading, setArticlesData} = useArticle(
        {location: "profile", username, tagName });

    return (
        <div className="fav-arts">
            <ArticlePreview 
            isLoading={isLoading}
            articles={articles}
            updateArticles={setArticlesData}
            ></ArticlePreview>
            <ArticlePagination
            username={username}
            articlesCount={articlesCount}
            location="profile"
            updateArticles={setArticlesData}
            ></ArticlePagination>
        </div>
    );
}

export default ProfileArticles;