import { ReactNode } from "react";
import ColContentList from "../ColContentList";

function ColContent({title=null, subtitle=null, contList=null, image=null, children=null} : 
    {title?:string | null, subtitle?:string | null, contList?: string[] | null, image?: string | null, children?: ReactNode | ReactNode[] | null }) {
    return (
        <div className="col">
            <div className="container-header">
                {title && <h1>{title}</h1>}
                {subtitle && <h3>{subtitle}</h3>}
            </div>
            { 
            contList && 
                <div className="container-content">
                    <ul className="content-ul">
                        <ColContentList contList={contList}/>
                    </ul>
                </div>
            }
            {children}
            {
                image &&
                    <div className="container-img-div">
                        <img src={image} className="container-img"/>
                    </div>  
            }
        </div>
    )
}

export default ColContent;