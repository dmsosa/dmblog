import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import NavbarLarge from "./NavbarLarge";
import NavbarSmall from "./NavbarSmall";
import scrollNavbar from "../../service/scrollNavbar";

function Navbar() {
    
    useEffect(() => {
        scrollNavbar()
        }, [])
    return (
        <div className="sticky-header nav-shadow">
            <NavbarLarge/>
            <NavbarSmall/>
        </div>
    )
}

export default Navbar;