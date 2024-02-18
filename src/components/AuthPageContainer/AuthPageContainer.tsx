import { ReactNode } from "react";
import { Link } from "react-router-dom";

function AuthPageContainer({children, error, title, path, message} : 
    {
        children: ReactNode | ReactNode[],
         error: string, 
         title: string, path: string, 
         message: string
    }) {

    
    return (
        <div className="container auth-cont">
            <div className="row">
                <div className="col">
                    <h1 className="auth-cont-title">{title}</h1>
                    {children}
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="col">
                    <p className="auth-cont-message">
                        <Link to={path}>{message}</Link>
                    </p>
                </div>
            </div>
        </div>   
    )
}    
export default AuthPageContainer;