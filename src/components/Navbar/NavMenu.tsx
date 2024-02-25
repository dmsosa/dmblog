import { useNavigate } from "react-router-dom";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import BrandLogo from "../Logos/BrandLogo";
import { logoutUser } from "../../service/userService";
import { LoggedOptions } from "./LoggedOptions";
import { NotLoggedOptions } from "./NotLoggedOptions";

function NavMenu() {
    const navigation = useNavigate();
    const { authState, setAuthState } =  useAuth() as TAuthContext;
    const { isAuth, loggedUser } = authState;

    const handleLogout = () => {
        if (setAuthState) {
            setAuthState(logoutUser);
            navigation("/");
        }
    };
    return (
            <ul className="navbar-nav">
                {isAuth && loggedUser ? 
                <LoggedOptions 
                username={loggedUser.username}
                handleLogout={handleLogout}
                /> : <NotLoggedOptions />}
            </ul>

)
}

export default NavMenu;