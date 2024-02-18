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
        <section className="nav-menu bg-color-white-nav d-block d-lg-none">
                    <div className="nav-menu-container container-lg p-0">
                        <nav className="navbar navbar-expand-lg p-0">
                            <div className="collapse navbar-collapse navbar-collapse-mobile" id="navbarMenu">
                                <ul className="navbar-nav">
                                    {isAuth ? 
                                    <LoggedOptions 
                                    username={loggedUser.username}
                                    handleLogout={handleLogout}
                                    /> : <NotLoggedOptions />}
                                </ul>
                            </div>
                        </nav>
                    </div>
        </section>
    )
}

export default NavMenu;