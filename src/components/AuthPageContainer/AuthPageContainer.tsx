import { ReactNode, ReactNodeArray } from "react";
import ContainerRow from "../ContainerRow";
import { Link } from "react-router-dom";

function AuthPageContainer({children, error, title, path, message} : 
    {
        children: ReactNode | ReactNode[],
         error: string, 
         title: string, path: string, 
         message: string
    }) {

    
    return (
        <div className="auth-page-cont">
            <ContainerRow>
                <h1 className="auth-cont-title">{title}</h1>
                {children}
                {error.length>1 && 
                <ul className="error-messages">
                    <li>{error}</li>
                </ul>}
                <p className="auth-cont-message">
                    <Link to={path}>{message}</Link>
                </p>
            </ContainerRow>
        </div>   
    )
}    
export default AuthPageContainer;