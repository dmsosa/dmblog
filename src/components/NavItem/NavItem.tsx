import { MouseEventHandler, ReactNode } from "react";
import { NavLink } from "react-router-dom";

function NavItem({icon=null, text="", url="", state="", activeClass="", onClick=undefined } : {
    icon?: any, 
    text?: string, 
    url?: string, 
    state?: string, 
    activeClass?: string,
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined}) {
    return (
        <li className="nav-item">
            <NavLink className={`nav-link ${activeClass}`} end state={state} to={url} onClick={onClick}>
                {icon && <i className={icon}></i>} {text}
            </NavLink>
        </li>
    )
}

export default NavItem;