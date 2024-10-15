import ReactPaginate from "react-paginate";
import useArticle from "../../hooks/useArticle";
import { TTagsContext, useTags } from "../../context/TagsContext";
import ArticlesList from "./ArticlesList";

type selectedItem = {
    selected: number;
};

function ArticlesPreview({ location, searchString, username = null }: { location: string, searchString?: string | null, username?: string | null }) {
    const { tags } = useTags() as TTagsContext;
    const { isLoading, articles, articlesCount, setArticlesData, offset, setOffset } = useArticle({location, tags, searchString, username});
    const pageCount = Math.ceil(articlesCount / 3);

    const getArticlesForPage = (event: selectedItem) => {
        setOffset(event.selected);
    }
    return (
        isLoading ?
        <div>Loading articles</div>
        :
        <div className="articles-preview-container container">
            <h1 className="search-count">{`${articlesCount} Articles found${searchString ? ` for ${searchString}!`:"!"}`}</h1>
            <div className="row articles-preview-row">
                <ArticlesList articles={articles} setArticlesData={setArticlesData} />
            </div>
            <div className="row articles-pag-row">
                <ReactPaginate 
                pageCount={pageCount}
                className="articles-pag"
                pageClassName="articles-pag--li"
                breakClassName="articles-pag--break"
                previousClassName="articles-pag--prev"
                nextClassName="articles-pag--next"
                activeClassName="articles-pag--active"
                pageLinkClassName="articles-pag--link"
                breakLinkClassName="articles-pag--link"
                nextLinkClassName="articles-pag--link"
                previousLinkClassName="articles-pag--link"
                breakLabel="..."
                previousLabel={"<"}
                nextLabel={">"}
                onPageChange={getArticlesForPage}
                forcePage={offset}
                disableInitialCallback={false}
                renderOnZeroPageCount={null}
                />
            </div>
        </div>
        
    )
}

export default ArticlesPreview;