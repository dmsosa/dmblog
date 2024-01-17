import { ReactNode } from "react";

function BannerContainer({children}:{children:ReactNode | ReactNode[]}) {
    return (
        <div className="container banner-container">
            <div className="row banner-row">
                {children}
            </div>
        </div>
    )
}


export default BannerContainer;