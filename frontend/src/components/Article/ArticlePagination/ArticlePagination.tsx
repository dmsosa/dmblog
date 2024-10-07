import ReactPaginate from "react-paginate";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { TArticleData, getArticles } from "../../../service/articleService";

type selectedItem = {
  selected: number;
};
function ArticlePagination({
  articlesCount,
  username,
  tags,
  updateArticles,
}: {
  articlesCount: number;
  username?: string | null;
  tags: string[];
  updateArticles: React.Dispatch<React.SetStateAction<TArticleData>>;
}) {
  const pageCount = Math.ceil(articlesCount / 3);

  const handlePageChange = (event: selectedItem) => {
    const page = event.selected;

    getArticles({  location: "global", offset: page, username, tags })
      .then((articleData: TArticleData) => {
        updateArticles(articleData);
      })
      .catch((error) => console.error(error));
  };
  return (
    <ReactPaginate
      activeClassName="active"
      breakClassName="page-item"
      breakLabel="..."
      breakLinkClassName="page-link"
      containerClassName="pagination pagination-sm"
      nextClassName="page-item"
      nextLabel={<FaArrowAltCircleRight />}
      nextLinkClassName="page-link"
      onPageChange={handlePageChange}
      pageClassName="page-item"
      pageCount={pageCount}
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLabel={<FaArrowAltCircleLeft />}
      previousLinkClassName="page-link"
      renderOnZeroPageCount={null}
    />
  );
}

export default ArticlePagination;
