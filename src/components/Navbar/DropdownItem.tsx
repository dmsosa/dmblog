import { useNavigate } from "react-router-dom";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../service/userService";
import { LoggedOptions } from "./LoggedOptions";
import { NotLoggedOptions } from "./NotLoggedOptions";

function DropdownItem() {
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
        <li className="nav-item dropdown ms-auto">
            <a className="nav-link dropdown-toggler"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false">
                {isAuth? "Mein Konto":"Optionen"}
            </a>
            <ul 
            className="dropdown-menu">
                {isAuth && loggedUser ? 
                <LoggedOptions 
                username={loggedUser.username}
                handleLogout={handleLogout}
                /> : <NotLoggedOptions />}
            </ul>
        </li>
    )
}

export default DropdownItem;