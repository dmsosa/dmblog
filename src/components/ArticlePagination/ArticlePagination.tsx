import { useState } from "react";
import ReactPaginate from "react-paginate";
import { TAuthState } from "../../context/AuthContext";

function ArticlePagination({ articlesCount, location, username, tagName, updateArticles } : { articlesCount: number, location?: string | null, username?: string | null, tagName?: string | null, updateArticles: any }) {

    const pageCount = Math.ceil(articlesCount / 3);


    const handlePageChange = () => {

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