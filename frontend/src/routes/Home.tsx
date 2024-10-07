
import ArticlesPreview from "../components/ArticlesPreview/ArticlesPreview.tsx";
import TagsContainer from "../components/TagsContainer.tsx/TagsContainer.tsx";
import TagsProvider from "../context/TagsContext.tsx";

function Home() {

  return (
      <div className="container bg-hero">
        <div className="row banner-quote">
          <h1>"Genie ist 1% Inspiration und 99% Transpiration"</h1>
        </div>
        <div className="row">
          <div className="col pagination-col">
            <TagsProvider>
              <TagsContainer/>
              <ArticlesPreview location="global"/>
            </TagsProvider>            
          </div>
        </div>
      </div>
  );
}

export default Home;
