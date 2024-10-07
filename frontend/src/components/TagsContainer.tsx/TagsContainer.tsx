import { TTagsContext, useTags } from "../../context/TagsContext";
import SelectedTags from "./SelectedTags";
import TagList from "./TagList";

function TagsContainer() {
  const { tags, setTags } = useTags() as TTagsContext;


  return (
    <div className="container tags-container">
        <SelectedTags tags={tags} setTags={setTags} />
        <TagList  tags={tags} setTags={setTags}/>
    </div>
  )
  
  
}

export default TagsContainer;
