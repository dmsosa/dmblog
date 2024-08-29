import { CSSProperties } from "react";
import apple from "../../assets/img/profile/apple.svg";
function BannerContainer({
  title,
  backgroundStyles,
  emoji,
}: {
  title?: string | null;
  backgroundStyles?: CSSProperties | null;
  emoji: string | null;
}) {
  const gradient = {
    background: `linear-gradient(0deg, ${backgroundStyles?.backgroundColor}, transparent)`,
  };

  return (
    <div
      id="banner"
      className="container banner-container"
      style={backgroundStyles as CSSProperties}
    >
      <div style={gradient}>
        <img src={emoji ? emoji : apple} />
        <span>{title}</span>
      </div>
    </div>
  );
}

export default BannerContainer;
