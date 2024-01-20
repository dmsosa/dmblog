

function TopicButton({ topicList } : { topicList: string[] }) {
    return topicList.map((name) => <button className="topic-btn">{name}</button>) 
}

export default TopicButton;