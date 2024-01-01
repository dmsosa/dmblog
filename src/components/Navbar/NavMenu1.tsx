import BrandLogo from "../Logos/BrandLogo";

function NavMenu1() {
    return (
        <>    
        <div className="nav-main-toggle">
            <button className="navbar-toggler nav-main-collapse d-inline-flex" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
        <div className="collapse navbar-collapse navbar-collapse-main" id="navbarSupportedContent">
                <ul className="navbar-nav nav-main-links">
                    <BrandLogo />
                </ul>
                
                </div>
            </>

    )
}

export default DropdownMenu;