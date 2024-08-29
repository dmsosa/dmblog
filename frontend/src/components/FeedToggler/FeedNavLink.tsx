import { MouseEvent } from "react";
import { TFeedContext, useFeed } from "../../context/FeedContext";

function FeedNavLink({ name, text }: { name: string; text: string }) {
  const { tabName, changeFeed } = useFeed() as TFeedContext;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    changeFeed(e, name);
  };
  return (
    <li className={`nav-link ${tabName === name ? "active" : ""}`}>
      <button className={`btn`} onClick={handleClick}>
        {text}
      </button>
    </li>
  );
}

export default FeedNavLink;
