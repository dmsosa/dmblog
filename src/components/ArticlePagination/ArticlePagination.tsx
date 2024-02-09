import { MouseEvent, useState } from "react";
import ReactPaginate from "react-paginate";
import { TAuthContext, TAuthState, useAuth } from "../../context/AuthContext";
import { TArticleData, getArticles } from "../../service/articleService";
import { TArticle } from "../../types/Article";
import { end } from "@popperjs/core";

function ArticlePagination({ 
  headers,
  articlesCount, 
  username, 
  tagName, 
  tabName,
  updateArticles } : { 
    headers: object | null,
    articlesCount: number,
    username?: string | null, 
    tagName?: string | null, 
    tabName?: string | null,
    updateArticles: React.Dispatch<React.SetStateAction<TArticleData>> }) {

    const pageCount = Math.ceil(articlesCount / 3);


    

    const handlePageChange = (event: any) => {
      const page = event.selected;
      const tab = tabName || "";
      const tag = tagName || "";
      getArticles({headers, location: tab, offset: page, username, tagName: tag})
      .then((articleData: TArticleData) => {updateArticles(articleData)})
      .catch((error) => (console.error(error)))

    }
    return (
        <ReactPaginate
        activeClassName="active"
        breakClassName="page-item"
        breakLabel="..."
        breakLinkClassName="page-link"  
        containerClassName="pagination pagination-sm"
        nextClassName="page-item"
        nextLabel={<i className="ion-arrow-right-b"></i>}
        nextLinkClassName="page-link"
        onPageChange={handlePageChange}
        pageClassName="page-item"
        pageCount={pageCount}
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLabel={<i className="ion-arrow-left-b"></i>}
        previousLinkClassName="page-link"
        renderOnZeroPageCount={null}
      />
    );
}

export default ArticlePagination;