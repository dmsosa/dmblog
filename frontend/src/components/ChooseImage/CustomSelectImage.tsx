import { MouseEvent, useEffect, useState } from "react";

const defaultImages = ["apple", "pear", "pineapple", "banana", "broccoli", "cucumber", "carrot", "orange", "cheese", "coconut", "avocado", "corn", "strawberry", "peach", "aubergine"];

function CustomSelectImage({ imageUrl, changeHandler }:{ imageUrl:string, changeHandler: (e: React.MouseEvent<HTMLDivElement>) => void }) {

    const [ currentImage, setCurrentImage ] = useState("cheese")

    useEffect(() => {
        let imageName = "";
        
        if (imageUrl) { 
            imageName = imageUrl.split("/profile/")[1].split(".")[0];
            setCurrentImage(imageName);
        };
    }, []);

    const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
        const customSelect = e.currentTarget.closest(".custom-select") as HTMLDivElement;
        customSelect.classList.toggle("active");
    }
    const handleClick = (e: MouseEvent<HTMLDivElement>, img: string) => {
        handleToggle(e);
        setCurrentImage(img);
        changeHandler(e);
    }
    return (
        <div className="default-images">
            <label htmlFor="custom-select">Choose image</label>
            <div className="custom-select">
                <div className={`select-item selected bg-${currentImage}`} onClick={handleToggle}></div>
                <div className="select-list">
                    <div className="select-item"></div>
                    { defaultImages.map((img) => (<div key={img} className={`select-item bg-${img}`} onClick={(e) => {handleClick(e, img)}}></div>))}
                </div>
            </div>
        </div>
    )
}

export default CustomSelectImage;