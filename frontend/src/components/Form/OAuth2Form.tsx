import { MouseEvent, useEffect } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CiFacebook } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import apple from "../../assets/img/profile/apple.svg";


function OAuth2Form({ setWithOAuth } : { 
    setWithOAuth: React.Dispatch<React.SetStateAction<boolean>>

  }) {

    const navigate = useNavigate();
    const { authState } = useAuth() as TAuthContext;
    const { isAuth } = authState;

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const provider = e.currentTarget ? e.currentTarget.classList[1].split("-")[2] : "";
        //Start OAuth2Flow 
        const apiURL = import.meta.env.VITE_BACKEND_URL + "api/users/oauth2/" + provider;
        window.location.replace(apiURL);
    }
    useEffect( () => {
        if (isAuth) { navigate("/")};
    }, [isAuth]);
    return (
        <div className="auth-page-container container pt-5">
            <div className="row auth-page-logo mb-5 pt-5"><img src={apple} alt="dmblog's logo"></img></div>
            <div className="row auth-page-title mb-5"><h1>Continue with OAuth2</h1></div>
            <div className="row auth-page-options mb-5">
                <button onClick={handleClick} className="auth-option auth-option-facebook"><CiFacebook color="white" size={"5rem"}/><span>Continue with Facebook</span></button>
                <button onClick={handleClick} className="auth-option auth-option-github"><FaGithub color="white" size={"5rem"}/><span>Continue with GitHub</span></button>
            </div>
            <div className="row form-footer">
                <p>or</p>
                <hr></hr>
                <div className="link" onClick={() => { setWithOAuth(false) }}>Continue with Email</div>
            </div>
        </div>
    );
}
export default OAuth2Form;