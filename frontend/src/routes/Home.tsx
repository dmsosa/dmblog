
import ArticlesPreview from "../components/ArticlesPreview/ArticlesPreview.tsx";
import BgHero from "../components/BgHero.tsx";
import TagsContainer from "../components/TagsContainer.tsx/TagsContainer.tsx";
import TagsProvider from "../context/TagsContext.tsx";

function Home() {

  return (
      <div className="container-fluid px-0">
        <BgHero/>
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
