import { ChangeEvent } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { TArticle } from "../../../types/Article";
import { putFontColor } from "../../../service/articleService";
import { ApiError } from "../../../service/errorHandler";

function FontColorPopUp({
    headers,
    slug,
    fontColor,
    handleFontColorChange,
  }: {
    headers: object;
    slug: string;
    fontColor: string;
    handleFontColorChange: (article: TArticle) => void;
  }) {
  
    const togglePopup = () => {
      document.querySelector(".colorPopup")?.classList.toggle("show");
    };
    const closePopup = () => {
      document.querySelector(".colorPopup")?.classList.remove("show");
    };
  
    const ref = useOutsideClick(closePopup);
  
    const handleColorInput = (e: ChangeEvent<HTMLInputElement>) => {
        //see changes while changing the input
        const banner = document.getElementById("banner") as HTMLDivElement;
        const gradient = banner.firstChild as HTMLDivElement;
        banner.style.backgroundColor = e.target.value;
        gradient.style.background = `linear-gradient(0deg, ${e.target.value}, transparent)`;
    };
    //change the value of the field in the backend, and then setArticle
    const sendColorToBackend = () => {
      putFontColor({ slug, fontColor, headers })
        .then((article: TArticle) => {
            handleFontColorChange(article);
        })
        .catch((error: ApiError) => console.log(error.getDefaultMessage()))
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
              name="fontColorInput"
              value={fontColor}
              onChange={handleColorInput}
            ></input>
            <span>background color</span>
          </label>
          <button className="btn btn-primary col-12" onClick={sendColorToBackend}>
            Confirm
          </button>
        </div>
      </div>
    );
}

  export default FontColorPopUp;