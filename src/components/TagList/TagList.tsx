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
         isLoading ? <div className="col-3"><h2>Tags are loading...</h2></div> :
         tagList.length > 0 ?
            <ColContent 
            addClass={"col-3 cont-topic"}
            subtitle={"topics"}
            >
                <div className="topic-btn-cont cont-content">            
                    <TagButton 
                    tagList={["spring", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary"]}
                    />    
                </div>
            </ColContent> :
        <div className="col-3"><h2>No tags available </h2></div>
            
    )
}

export default TagList;