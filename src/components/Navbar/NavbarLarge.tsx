import { useState } from "react";
import { TAuthContext, TAuthState, useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../service/logoutUser";
import BrandLogo from "../Logos/BrandLogo";
import NavMenu from "./NavMenu";

function NavbarLarge() {
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const [dropdown, setDropdown] = useState(false);
    const logout = () => {
        if (setAuthState) {
            setAuthState(logoutUser);
        }
    };

    const handleClick = () => {
        setDropdown(!dropdown);
    }
    return (
        <section className="nav-menu bg-color-blue-nav d-none d-lg-block ">
                        <nav className="navbar navbar-expand-lg px-5 py-0">
                            <BrandLogo/>
                            <div className="collapse navbar-collapse initiated" id="navbarMenu">
                                <ul className="navbar-nav w-100">
                                    <li className="nav-item ms-auto me-0">
                                        <a className="nav-link">God</a>
                                    </li>
                                    <li className="nav-item ms-3 me-0" >
                                        <a className="nav-link">Blessed</a>
                                    </li>
                                    <li className="nav-item ms-3 me-0">
                                        <a className="nav-link">Me</a>
                                    </li>
                                    <li className="nav-item dropdown ms-auto me-3">
                                        <a className="nav-link dropdown-toggler"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        onClick={handleClick}>Mein Konto</a>
                                            <ul className="dropdown-menu" style={{display: dropdown ? "block" : "none"}}
                                            onMouseLeave={handleClick}>
                                                <li>
                                                    <a className="dropdown-item" href="#">Einstellungen</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#">Mein Lieblingsprodukte</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#">Mein Profil</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#" role="button" onClick={logout}>Logout</a>
                                                </li>
                                            </ul>
                                    </li>
                                </ul>
                            </div>
                        </nav>
        </section>
    )
}

export default NavbarLarge;