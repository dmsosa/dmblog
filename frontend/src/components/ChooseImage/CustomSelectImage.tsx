import { MouseEvent, useState } from "react";

const defaultIcons = [
  "apple",
  "pear",
  "pineapple",
  "banana",
  "broccoli",
  "cucumber",
  "carrot",
  "orange",
  "cheese",
  "coconut",
  "avocado",
  "corn",
  "strawberry",
  "peach",
  "aubergine",
];

function CustomSelectImage({
  icon,
  changeHandler,
}: {
  icon: string;
  changeHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const [ currentIcon, setCurrentIcon ] = useState(icon);

  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    const customSelect = e.currentTarget.closest(
      ".custom-select",
    ) as HTMLDivElement;
    customSelect.classList.toggle("active");
  };
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const iconName = e.currentTarget.classList[1].replace("bg-", "");
    handleToggle(e);
    setCurrentIcon(iconName);
    changeHandler(e);
  };
  return (
    <div className="default-images">
      <label htmlFor="custom-select">Choose image</label>
      <div className="custom-select">
        <div
          className={`select-item selected bg-${currentIcon}`}
          onClick={handleToggle}
        ></div>
        <div className="select-list">
          <div className="select-item"></div>
          {defaultIcons.map((defaultIcon) => (
            <div
              key={defaultIcon}
              className={`select-item bg-${defaultIcon}`}
              onClick={handleClick}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomSelectImage;
