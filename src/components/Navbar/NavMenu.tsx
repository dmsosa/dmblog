import { useNavigate } from "react-router-dom";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import BrandLogo from "../Logos/BrandLogo";
import { logoutUser } from "../../service/userUtils";

function NavMenu() {
    const navigation = useNavigate();
    const { authState, setAuthState } =  useAuth() as TAuthContext;
    const { isAuth } = authState;

    const logout = () => {
        if (setAuthState) {
            setAuthState(logoutUser);
            navigation("/");
        }
    };
    return (
        <section className="nav-menu bg-color-white-nav d-block d-lg-none">
                    <div className="nav-menu-container container-lg p-0">
                        <nav className="navbar navbar-expand-lg p-0">
                            <div className="collapse navbar-collapse navbar-collapse-mobile" id="navbarMenu">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a 
                                        className="nav-link"
                                        href="#">
                                            Search</a>
                                        <span>F</span>
                                    </li>
                                    <li className="nav-item">
                                        <a 
                                        className="nav-link" 
                                        href="#">
                                            Einstellungen</a>
                                        <span>F</span>
                                    </li>
                                    <li className="nav-item">
                                        <a 
                                        className="nav-link" 
                                        href={isAuth? "#":"login"}>
                                            {isAuth? "Mein Profile":"Login"}</a>
                                            <span>F</span>
                                    </li>
                                    <li className="nav-item">
                                        <a 
                                        className="nav-link" 
                                        href={isAuth? "#":"sign-up"}
                                        >
                                            {isAuth? "About us":"Sign Up"}
                                        </a>
                                        <span>F</span>
                                    </li>
                                    {
                                        isAuth && 
                                            <li className="nav-item">
                                            <a 
                                            className="nav-link" 
                                            href="#"
                                            onClick={logout}
                                            >
                                                Log out
                                            </a>
                                            </li>
                                    }
                                </ul>
                            </div>
                        </nav>
                    </div>
        </section>
    )
}

export default NavMenu;