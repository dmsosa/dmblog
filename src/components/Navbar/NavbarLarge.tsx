import BrandLogo from "../Logos/BrandLogo";
import DropdownItem from "./DropdownItem";

function NavbarLarge() {

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
                                    <DropdownItem/>
                                </ul>
                            </div>
                        </nav>
        </section>
    )
}

export default NavbarLarge;