import { useNavigate } from "react-router-dom";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { logoutUser } from "../../service/userService";

function DropdownItem() {
    const navigation = useNavigate();
    const { authState, setAuthState } =  useAuth() as TAuthContext;
    const { isAuth } = authState;

    const [dropdown, setDropdown] = useState(false);
    const logout = () => {
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
                    <li className="dropdown-item">
                        <a className="dropdown-link" href={isAuth? "#":"login"}>{isAuth? "Mein Profil":"Login"}</a>
                    </li>
                    <li className="dropdown-item">
                        <a className="dropdown-link" href={isAuth? "#":"sign-up"}>{isAuth? "Search":"Sign Up"}</a>
                    </li>
                    <li className="dropdown-item">
                        <a className="dropdown-link" href="#">Einstellungen</a>
                    </li>
                    { isAuth && <li className="dropdown-item">
                        <a className="dropdown-link" href="#" role="button" onClick={logout}>Logout</a>
                    </li> }
                </ul>
        </li>
    )
}

export default DropdownItem;