import { CSSProperties, ChangeEvent } from "react";

function BannerContainer({title, backgroundStyles, setBackgroundColor }:
    {title?: string | null, backgroundStyles?: CSSProperties | null, setBackgroundColor: React.Dispatch<React.SetStateAction<string>>}) {
    const gradient = {
        background: `linear-gradient(0deg, ${backgroundStyles?.backgroundColor}, transparent)`
    }

    const showPopup = () => {
        const popupContent = document.querySelector(".popupcontent");
        if (popupContent?.classList.contains("show")) {
            return
        };
        popupContent?.classList.toggle("show")
    }
    const handleColor = () => {
        const popupContent = document.querySelector(".popupcontent");
        popupContent?.classList.toggle("show");
    }

    return (
        <div className="container banner-container" style={backgroundStyles as CSSProperties}>
            <div className="row row-cols-3" style={gradient}>            
                <div className="col col-4">
                    <button className="emoji-picker-btn"></button>
                </div>
                <div className="col col-4">
                    <h1 >{title}</h1>
                </div>
                <div className="col col-4">
                    <button className="color-picker-btn popup" onClick={showPopup}>Change background color</button>
                    <div className="popupcontent">
                        <span>Select Background Color</span>
                        <input type="color" id="backgroundColor" value={backgroundStyles?.backgroundColor}/>
                        <button onClick={handleColor}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BannerContainer;