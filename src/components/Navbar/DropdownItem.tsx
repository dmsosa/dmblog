import { useNavigate } from "react-router-dom";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { logoutUser } from "../../service/userService";
import { LoggedOptions } from "./LoggedOptions";
import { NotLoggedOptions } from "./NotLoggedOptions";

function DropdownItem() {
    const navigation = useNavigate();
    const { authState, setAuthState } =  useAuth() as TAuthContext;
    const { isAuth, loggedUser } = authState;

    const [dropdown, setDropdown] = useState(false);
    const handleLogout = () => {
        if (setAuthState) {
            setAuthState(logoutUser);
            navigation("/");
        }
    };

    const handleClick = () => {
        setDropdown(!dropdown);
    }

    return (
        <li className="nav-item dropdown ms-auto me-3">
            <a className="nav-link dropdown-toggler"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={handleClick}
            onMouseLeave={handleClick}>
                {isAuth? "Mein Konto":"Optionen"}
            </a>
                <ul 
                className="dropdown-menu" 
                style={{display: dropdown ? "block" : "none"}}
                onMouseLeave={handleClick} >
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