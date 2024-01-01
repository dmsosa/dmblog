
import BrandLogo from "../Logos/BrandLogo";
import NavMenu from "./NavMenu";
function NavbarSmall() {

    return (
        <section className="bg-color-blue-nav">
            <div className="container-lg p-0 d-lg-none" id="mainNavContainer">
                <nav className="navbar navbar-expand nav-main" id="mainNav">
                    <BrandLogo />
                    <div className="nav-main-toggle">
                        <button className="navbar-toggler nav-main-collapse d-inline-flex" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse navbar-collapse-main" id="navbarSupportedContent">
                        <ul className="navbar-nav nav-main-links">
                            <BrandLogo/>
                        </ul>
                        <NavMenu />

                    </div>
                </nav>
            </div>
        </section>
    )
}

export default NavbarSmall;