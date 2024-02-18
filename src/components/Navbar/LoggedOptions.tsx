import { Link } from "react-router-dom";
import { FiArrowDownCircle } from "react-icons/fi"
import { FaBeer } from "react-icons/fa"
import NavItem from "../NavItem";

export function LoggedOptions({ username, handleLogout } : { username: string, handleLogout: () => void }) {
    return (
        <>
            <NavItem icon="bi-globe" text="Profile" url={`profile/${username}`}/>
            <NavItem icon="bi-globe" text="New Article" url="/editor"/>
            <NavItem icon="bi-globe" text="Settings" url="/settings"/>
            <li className="nav-item"><a role="button" onClick={handleLogout}>Logout</a></li>

        </>
    )
}