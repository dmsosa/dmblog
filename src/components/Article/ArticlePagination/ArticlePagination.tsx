import ReactPaginate from "react-paginate";

import { TArticleData, getArticles } from "../../../service/articleService";
import { TAuthContext, useAuth } from "../../../context/AuthContext";

function ArticlePagination({ 
  articlesCount, 
  username, 
  tagName, 
  location,
  updateArticles } : { 
    articlesCount: number,
    username?: string | null, 
    tagName?: string | null, 
    location: string,
    updateArticles: React.Dispatch<React.SetStateAction<TArticleData>> }) {

    const pageCount = Math.ceil(articlesCount / 3);
    const { authState } = useAuth() as TAuthContext;
    const { headers } = authState;
    
    const handlePageChange = (event: any) => {
      const page = event.selected;

      getArticles({headers, location, offset: page, username, tagName})
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