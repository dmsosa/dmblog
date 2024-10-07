import { useState } from "react";
import { TArticle } from "../../../types/Article";
import useOutsideClick from "../../../hooks/useOutsideClick";
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from "emoji-picker-react";
import { putEmoji } from "../../../service/articleService";

function EmojisPopUp({
    headers,
    slug,
    handleEmojiChange,
  }: {
    headers: object;
    slug: string;
    handleEmojiChange: (article: TArticle) => void;
  }) {
    const [emojiOpen, setEmojiOpen] = useState(false);
  
    const closePopup = () => {
      if (emojiOpen) {
        setEmojiOpen(false);
      }
    };
  
    const ref = useOutsideClick(closePopup);
  
    const handleEmojiInput = (emoji: EmojiClickData) => {
      setEmojiOpen(!emojiOpen);
      //see changes while changing the input
      const imgElement = document.querySelector("#banner>div>img");
      if (imgElement) {
        imgElement.setAttribute("src", emoji.imageUrl);
      }
      sendEmojiToBackend(emoji.imageUrl);
    };
  
    const sendEmojiToBackend = (emoji: string) => {
      putEmoji({ slug, emoji, headers }).then((article) =>
        handleEmojiChange(article),
      );
    };
  
    return (
      <div className="divPopup emojiPopup col-3" ref={ref}>
        <button
          className="btn btn-popup"
          onClick={() => {
            setEmojiOpen(!emojiOpen);
          }}
        >
          emoji
        </button>
  
        <EmojiPicker
          className="emojiPopup"
          style={{
            margin: 0,
            padding: 0,
            position: "absolute",
            boxShadow: "0 0 50px rgba(0, 0%, 0%, 0.5)",
            animation: "fadeIn 0.25s",
            backgroundColor: "#000D1C",
          }}
          onEmojiClick={handleEmojiInput}
          emojiStyle={EmojiStyle.TWITTER}
          theme={Theme.DARK}
          open={emojiOpen}
        />
      </div>
    );
}

export default EmojisPopUp;