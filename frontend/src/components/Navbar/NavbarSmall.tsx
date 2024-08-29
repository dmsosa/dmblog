import BrandLogo from "../Logos/BrandLogo";
import NavMenu from "./NavMenu";
function NavbarSmall() {
  const nonScrollBody = () => {
    document.body.classList.toggle("nonscroll");
  };
  return (
    <section className="nav-menu bg-color-blue-nav p-0 d-lg-none">
      <nav className="navbar navbar-expand-lg px-3 navbar-mobile">
        <BrandLogo />
        <div className="nav-mobile-toggle">
          <button
            className="navbar-toggler nav-main-collapse d-inline-flex"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={nonScrollBody}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="collapse navbar-collapse navbar-collapse-mobile"
          id="navbarSupportedContent"
        >
          <nav className="navbar">
            <BrandLogo />
          </nav>
          <NavMenu />
        </div>
      </nav>
    </section>
  );
}

export default NavbarSmall;
