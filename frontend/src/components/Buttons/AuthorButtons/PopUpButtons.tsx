import { ChangeEvent, useState } from "react";
import {
  putBackgroundColor,
  putEmoji,
  putFontColor,
} from "../../../service/articleService";
import { errorHandler } from "../../../service/errorHandler";
import { TAuthContext, useAuth } from "../../../context/AuthContext";
import { TArticle } from "../../../types/Article";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import useOutsideClick from "../../../hooks/useOutsideClick";

export function PopUpColors({
  slug,
  backgroundColor,
  fontColor,
  setArticleWithNewFields,
}: {
  slug: string;
  backgroundColor: string | null;
  fontColor: string | null;
  setArticleWithNewFields: (article: TArticle) => void;
}) {
  const { authState } = useAuth() as TAuthContext;
  const { headers } = authState;

  const togglePopup = () => {
    document.querySelector(".colorPopup")?.classList.toggle("show");
  };
  const closePopup = () => {
    document.querySelector(".colorPopup")?.classList.remove("show");
  };

  const ref = useOutsideClick(closePopup);

  const handleColorInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "backgroundColorInput") {
      //see changes while changing the input
      const banner = document.getElementById("banner");
      if (banner) {
        const div = banner.firstChild as HTMLDivElement;
        banner.style.backgroundColor = e.target.value;
        div.style.background = `linear-gradient(0deg, ${e.target.value}, transparent)`;
      }
    } else if (e.target.name === "fontColorInput") {
      //see changes while changing the input
      const span = document.querySelector(
        "#banner>div>span",
      ) as HTMLSpanElement;
      if (span) {
        span.style.color = e.target.value;
      }
    }
  };
  //change the value of the field in the backend, and then setArticle
  const sendColorToBackend = () => {
    putBackgroundColor({ slug, backgroundColor, headers })
      .then(() => {
        putFontColor({ slug, fontColor, headers })
          .then((art) => setArticleWithNewFields(art))
          .catch((error) => errorHandler(error));
      })
      .catch((error) => errorHandler(error))
      .finally(() => togglePopup());
  };

  return (
    <div className="divPopup col-3" ref={ref}>
      <button
        className="btn btn-popup"
        name="colorPopup"
        onClick={() => togglePopup()}
      >
        color
      </button>
      <div className="colorPopup row">
        <label className="col-12">
          <input
            id="backgroundColor"
            type="color"
            name="backgroundColorInput"
            value={backgroundColor || "#51FF00"}
            onChange={handleColorInput}
          ></input>
          <span>background color</span>
        </label>
        <label className="col-12">
          <input
            id="fontColor"
            type="color"
            name="fontColorInput"
            value={fontColor || "black"}
            onChange={handleColorInput}
          ></input>
          <span>font color</span>
        </label>
        <button className="btn btn-primary col-12" onClick={sendColorToBackend}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export function PopUpEmojis({
  slug,
  setArticleWithNewFields,
}: {
  slug: string;
  setArticleWithNewFields: (article: TArticle) => void;
}) {
  const { authState } = useAuth() as TAuthContext;
  const { headers } = authState;

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
      setArticleWithNewFields(article),
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
