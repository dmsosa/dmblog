import BrandLogo from "../Logos/BrandLogo";

function NavMenu() {
    return (
        <section className="nav-menu bg-color-white-nav d-block d-lg-none">
                    <div className="nav-menu-container container-lg p-0">
                        <nav className="navbar navbar-expand-lg p-0">
                            <div className="collapse navbar-collapse navbar-collapse-mobile" id="navbarMenu">
                                <ul className="navbar-nav">
                                    <li className="nav-item"><a className="nav-link">Unity</a></li>
                                    <li className="nav-item"><a className="nav-link">Languages</a></li>
                                    <li className="nav-item"><a className="nav-link">Peace</a></li>
                                    <li className="nav-item"><a className="nav-link">Geduldigkeit</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
        </section>
    )
}

export default NavMenu;