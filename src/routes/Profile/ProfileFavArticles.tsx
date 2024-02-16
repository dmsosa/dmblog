import { useState } from "react";
import ArticlePagination from "../../components/Article/ArticlePagination";
import ArticlePreview from "../../components/Article/ArticlePreview";
import { TArticle } from "../../types/Article";

function ProfileFavArticles({ headers, username, articles, setArticles, isLoading } : {
    headers: object | null,
    username: string, 
    articles: TArticle[],
    setArticles: any,
    isLoading: boolean

}) {
    


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
            
            ></ArticlePagination>
        </div>
        
    )
}

export default ProfileFavArticles;