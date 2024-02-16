import { useState } from "react";
import ArticlePagination from "../../components/Article/ArticlePagination";
import ArticlePreview from "../../components/Article/ArticlePreview";
import { TArticle } from "../../types/Article";

function ProfileArticles({ headers, username, articles, articlesCount, setArticles, isLoading } : {
    headers: object | null,
    username: string, 
    articles: TArticle[],
    articlesCount: number,
    setArticles: any,
    isLoading: boolean }) {

    const 

    return (
        <div className="fav-arts">
            <ArticlePreview 
            headers={headers}
            isLoading={isLoading}
            username={username}
            articles={articles}
            updateArticles={setArticles}
            ></ArticlePreview>
            <ArticlePagination
            headers={headers}
            username={username}
            articlesCount={articlesCount}
            location="profile"
            updateArticles={setArticles}
            ></ArticlePagination>
        </div>
    );
}

export default ProfileArticles;