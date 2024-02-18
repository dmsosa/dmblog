import NavItem from "../NavItem";

export function NotLoggedOptions() {
    return (
        <>
            <NavItem icon="bi-globe" text="Login" url="/login"/>
            <NavItem icon="bi-globe" text="Sign Up" url="/signup"/>
            <NavItem icon="bi-globe" text="About us" url="/more"/>
        </>
    )
}