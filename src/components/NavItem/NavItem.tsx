import { MouseEventHandler, ReactNode } from "react";
import { NavLink } from "react-router-dom";

function NavItem({icon=null, text="", url="", state="", activeClass=false, onClick=undefined } : {
    icon?: any, 
    text?: string, 
    url?: string, 
    state?: string, 
    activeClass?: boolean,
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined}) {
    return (
        <li className={activeClass ? "nav-item active":"nav-item"}>
            <NavLink className={"nav-link"} end state={state} to={url} onClick={onClick}>
                {icon && <i className={icon}></i>} {text}
            </NavLink>
        </li>
    )
}

export default NavItem;