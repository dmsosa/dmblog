import { useState } from "react";
import AuthorInfo from "../../components/Profile/AuthorInfo";
import { useParams } from "react-router-dom";
import TagsProvider from "../../context/TagsContext";
import TagsContainer from "../../components/TagsContainer.tsx/TagsContainer";
import ArticlesPreview from "../../components/ArticlesPreview/ArticlesPreview";

type Ttoggle = "author" | "favs";
function Profile() {
  const { username } = useParams();
  const [toggle, setToggle] = useState<Ttoggle>("author");

  return (
    <div className="container profile-container">
      {/* AuthorInfo has its own rows inside */}
      <AuthorInfo />
      <div className="row">
        <i className="bi bi-airplane-fill"></i>
        <button onClick={() => { setToggle("author")}}>Written Articles</button>
        <button onClick={() => { setToggle("favs")}}>Favorite Articles</button>
      </div>
      <div className="row">
        <TagsProvider>
          <TagsContainer/>
          <ArticlesPreview location={toggle} username={username}/>
        </TagsProvider>  
      </div>
    </div>
  );
}

export default Profile;
