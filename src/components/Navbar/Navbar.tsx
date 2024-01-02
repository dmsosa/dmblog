import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import NavbarLarge from "./NavbarLarge";
import NavbarSmall from "./NavbarSmall";

function Navbar() {
    const [scroll, setScroll] = useState(0);
    useEffect(() => {
        const onScroll = () => setScroll(window.scrollY);
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, {passive : true});
    }, [])
    return (
        <div className="sticky-header nav-down nav-shadow">
            <NavbarLarge/>
            <NavbarSmall/>
        </div>
    )
}

export default Navbar;