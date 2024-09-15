import { MouseEvent, useEffect } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CiFacebook } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { GiFishBucket } from "react-icons/gi";


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
        <div className="container">
            <div className="row auth-page-logo mb-5 pt-5"><GiFishBucket fontSize={25}/></div>
            <div className="row oauth-buttons mb-5">
                <button onClick={handleClick} className="oauth-btn oauth-btn-facebook"><div className="oauth-btn-logo"><CiFacebook color="white"/></div><span>Continue with Facebook</span></button>
                <button onClick={handleClick} className="oauth-btn oauth-btn-github"><div className="oauth-btn-logo"><FaGithub color="white"/></div><span>Continue with GitHub</span></button>
            </div>
            <div className="row reg-form-footer">
                <p>or</p>
                <hr></hr>
                <div className="link" onClick={() => { setWithOAuth(false) }}>Continue with Email</div>
            </div>
        </div>
    );
}
export default OAuth2Form;