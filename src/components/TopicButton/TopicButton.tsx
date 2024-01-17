import { ReactNode } from "react";

function TopicButton({ topicList } : { topicList: string[] }) {
    return topicList.map((name) => <button>{name}</button>) 
}

export default TopicButton;