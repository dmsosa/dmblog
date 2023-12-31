import { Link } from "react-router-dom";
import { FiArrowDownCircle } from "react-icons/fi"
import { FaBeer } from "react-icons/fa"
import NavItem from "../NavItem";

export function LoggedOptions() {
    return (
        <div>
            <NavItem icon="bi-globe" text="My account" url="/"/>
        </div>
    )
}