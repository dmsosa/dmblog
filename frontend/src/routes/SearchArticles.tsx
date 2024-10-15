
import { useParams } from "react-router-dom";
import ArticlesPreview from "../components/ArticlesPreview/ArticlesPreview.tsx";
import TagsProvider from "../context/TagsContext.tsx";
import SearchItem from "../components/SearchItem.tsx";


function SearchArticles() {
  const { search } = useParams();
  return (
      <div className="container search-container px-0">
        <div className="row">
            <h1>Look for some Articles</h1>
            <SearchItem />
        </div>
        <div className="row">
          <div className="col pagination-col">
            <TagsProvider>
                <ArticlesPreview location="search" searchString={search}/>
            </TagsProvider>
          </div>
        </div>
      </div>
  );
}

export default SearchArticles;
