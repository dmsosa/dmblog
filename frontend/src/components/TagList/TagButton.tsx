import { MouseEvent } from "react";
import { TFeedContext, useFeed } from "../../context/FeedContext";

function TagButton({ tagList }: { tagList: string[] }) {
  const { changeFeed } = useFeed() as TFeedContext;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    changeFeed(e, "tag");
  };
  return tagList.slice(0, 50).map((name) => (
    <button key={name} className="topic-btn" onClick={handleClick}>
      {name}
    </button>
  ));
}

export default TagButton;
