import { CSSProperties } from "react";
import apple from "../../assets/img/profile/apple.svg";
function BannerContainer({
  title,
  backgroundColor,
  fontColor,
  emoji,
}: {
  title?: string | null;
  backgroundColor?: string | null;
  fontColor?: string | null;
  emoji?: string | null;
}) {
  const gradient = {
    background: `linear-gradient(0deg, ${backgroundColor ? backgroundColor : "#99ff33"}, transparent)`,
  };

  const backgroundStyles = {
    color: fontColor || "#000D1C",
    backgroundColor: backgroundColor || "#99ff33",
    backgroundImage: "none",
    backgroundPosition: "top",
    backgroundSize: "45%",
    backgroundRepeat: "no-repeat",
    display: "block",
    height: "25rem",
  };


  return (
    <div className="container banner-container"style={backgroundStyles as CSSProperties}>
      <div style={gradient}>
        <img src={emoji ? emoji : apple} />
        <span>{title}</span>
      </div>
    </div>
  );
}

export default BannerContainer;
