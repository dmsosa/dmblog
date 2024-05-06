import { CSSProperties, ReactNode } from "react";

function BannerContainer({title, backgroundStyles }:{title?: string | null, backgroundStyles?: CSSProperties | null}) {
    const gradient = {
        background: `linear-gradient(0deg, ${backgroundStyles?.backgroundColor}, transparent)`
    }
    return (
        <div className="container banner-container" style={backgroundStyles as CSSProperties}>
            <h1 style={gradient}>{title}</h1>
        </div>
    )
}


export default BannerContainer;