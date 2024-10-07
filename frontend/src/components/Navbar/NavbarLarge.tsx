import BrandLogo from "./BrandLogo";
import NavItem from "../NavItem";
import DropdownItem from "./DropdownItem";

function NavbarLarge() {
  const handleClick = () => {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu?.classList.toggle("show");
  };
  return (
    <section className="nav-menu bg-color-blue-nav d-none d-lg-block ">
      <nav className="navbar navbar-expand-lg">
        <BrandLogo />
        <div className="collapse navbar-collapse initiated" id="navbarMenu">
          <ul className="navbar-nav w-100">
            <li className="nav-item ms-auto me-0">
              <a className="nav-link">God</a>
            </li>
            <li className="nav-item ms-3 me-0">
              <a className="nav-link" onClick={handleClick}>
                Blessed
              </a>
            </li>
            <NavItem text="New Article" url="/editor" onClick={handleClick} />
            <DropdownItem />
          </ul>
        </div>
      </nav>
    </section>
  );
}

export default NavbarLarge;
