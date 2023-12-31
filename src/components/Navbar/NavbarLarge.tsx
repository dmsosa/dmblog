import { Link } from 'react-router-dom';
import { FcAndroidOs } from "react-icons/fc";


import apple from '../../assets/apple.svg';
import NavItem from '../NavItem';

{/* <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Home</a>
        <a class="nav-link" href="#">Features</a>
        <a class="nav-link" href="#">Pricing</a>
        <a class="nav-link disabled">Disabled</a>
      </div>
    </div>
  </div>
</nav> */}
function NavbarLarge() {
    return (
        <section className="nav-menu d-none d-lg-block">
            <nav className="navbar nav-main 
            bg-dark 
            navbar-expand-lg">
                <div className="container-fluid nav-container">
                    <Link
                    className="navbar-brand col-2" to="/">
                            <img 
                            src={apple}
                            className="brand-logo"/>
                            <span className="brand-name">dmsosa</span> 
                    </Link>
                    <ul className="navbar-nav col-8">
                        <NavItem text="Search"/>
                        <NavItem text="Food"/>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item">Login</a></li>
                                <li><a className="dropdown-item">Logout</a></li>
                                <li><a className="dropdown-item">Settings</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>   
                
            </nav>
        </section>
    )
}

export default NavbarLarge;