import ColContent from "../ColContent";
import TopicButton from "../TopicButton";

function TopicList({ classes="" } : { classes: string }) {
    return (
        <ColContent 
        addClass={"col-3 cont-topic"}
        subtitle={"topics"}
        >
            <div className="topic-btn-cont cont-content">            
                <TopicButton 
                topicList={["spring", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary", "dictionary"]}
                />    
            </div>
        </ColContent>
            
    )
}

export default TopicList;