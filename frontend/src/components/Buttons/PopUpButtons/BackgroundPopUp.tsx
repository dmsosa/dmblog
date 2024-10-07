import { ChangeEvent } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { TArticle } from "../../../types/Article";
import { putBackgroundColor } from "../../../service/articleService";
import { ApiError } from "../../../service/errorHandler";

function BackgroundPopUp({
    headers,
    slug,
    backgroundColor,
    handleBackgroundColorChange,
  }: {
    headers: object;
    slug: string;
    backgroundColor: string;
    handleBackgroundColorChange: (article: TArticle) => void;
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
      putBackgroundColor({ slug, backgroundColor, headers })
        .then((article: TArticle) => {
          handleBackgroundColorChange(article);
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
              name="backgroundColorInput"
              value={backgroundColor || "#51FF00"}
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

export default BackgroundPopUp;