import BrandLogo from "../Logos/BrandLogo";
import NavMenu from "./NavMenu";

function NavbarLarge() {
    return (
        <section className="nav-menu bg-color-blue-nav d-none d-lg-block">
                    <div className="nav-menu-container container-lg">
                        <nav className="navbar navbar-expand-lg px-2 py-0">
                            <BrandLogo/>
                            <div className="collapse navbar-collapse initiated" id="navbarMenu">
                                <ul className="navbar-nav w-100">
                                    <li className="nav-item ms-auto me-0"><a className="nav-link">God</a></li>
                                    <li className="nav-item ms-3 me-0" ><a className="nav-link">Blessed</a></li>
                                    <li className="nav-item ms-3 me-0"><a className="nav-link">Me</a></li>
                                    <li className="nav-item dropdown ms-auto me-3"><a className="nav-link">MyAccount</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
        </section>
    )
}

export default NavbarLarge;