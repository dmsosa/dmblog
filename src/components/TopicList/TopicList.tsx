import TopicButton from "../TopicButton";

function TopicList({ classes="" } : { classes: string }) {
    return (
        <div className={"col" + classes}>
            <TopicButton topicList={["spring", "dictionary"]}/>    
        </div>
    )
}

export default TopicList;