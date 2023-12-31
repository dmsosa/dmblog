import { Link } from "react-router-dom";
import apple from "../../assets/apple.svg";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
function NavbarSmall() {

    return (
        <section className="bg-color-blue-nav">
            <div className="container-lg p-0" id="mainNavContainer">
                <nav className="navbar navbar-expand nav-main" id="mainNav">
                    <Link 
                    className="navbar-brand"
                    to="/">
                        <img src={apple}
                        className="brand-logo"/>
                        <span className="brand-name">dmsosa</span> 
                    </Link>
                    <div className="nav-main-toggle">
                    <button className="navbar-toggler nav-main-collapse d-inline-flex" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    </div>
                    
                    <div className="collapse navbar-collapse navbar-collapse-main" id="navbarSupportedContent">
                            <ul className="navbar-nav nav-main-links">
                                <Link 
                                    className="navbar-brand"
                                    to="/">
                                        <img src={apple}
                                        className="brand-logo"/>
                                        <span className="brand-name">dmsosa</span> 
                                </Link>
                            </ul>
                            <section className="nav-menu">
                                <div className="nav-menu-container">
                                    <nav className="navbar navbar-expand-lg">
                                        <div className="collapse navbar-collapse initiated" id="navbarMenu">
                                            <ul className="navbar-nav">
                                                <li className="nav-item">Unity</li>
                                                <li className="nav-item">Languages</li>
                                                <li className="nav-item">About us</li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </section>



                            </div>
                    </nav>
            </div>
        </section>
    )
}

export default NavbarSmall;