import BrandLogo from "./BrandLogo";
import NavMenu from "./NavMenu";
import { Collapse } from "react-bootstrap";

function NavbarSmall() {
  const nonScrollBody = () => {
    document.body.classList.toggle("nonscroll");
  };
  return (
    <section className="nav-menu bg-color-blue-nav p-0 d-lg-none">
      <nav className="navbar navbar-expand-lg navbar-mobile">
        <BrandLogo />
        <Collapse>
        <div>Option 1</div>
        </Collapse>
        {/* <button
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
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <NavMenu />
        </div> */}
      </nav>
    </section>
  );
}

export default NavbarSmall;
