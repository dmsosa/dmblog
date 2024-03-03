import { useEffect, useState } from "react";
import ColContent from "../ColContent";
import TagButton from "./TagButton";
import { getTags } from "../../service/tagService";

function TagList() {

    const [ tagList, setTagList ] = useState<string[]>([]);
    const [isLoading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        const tags = getTags()
        .then((list) => {
            setTagList(list);
        } )
        .catch((error) => { console.error(error) })
        .finally(() => {setLoading(false)});
    }, [])
    return (
         isLoading ? <div className="col-4"><h2>Tags are loading...</h2></div> :
         tagList.length > 0 ?
            <ColContent 
            addClass={"col-4 cont-tags"}
            subtitle={"tags"}
            >
                <div className="topic-btn-cont cont-content">            
                    <TagButton 
                    tagList={["spring", "a", "b", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "c", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary"]}
                    />    
                </div>
            </ColContent> :
        <div className="col-3"><h2>No tags available </h2></div>
            
    )
}

export default TagList;