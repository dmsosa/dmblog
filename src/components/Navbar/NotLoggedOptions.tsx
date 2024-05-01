import NavItem from "../NavItem";

export function NotLoggedOptions() {
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById("navbarSupportedContent")?.classList.toggle("show");
    }
    return (
        <>
            <NavItem icon="bi-globe" text="Login" url="/login" onClick={onClick}/>
            <NavItem icon="bi-globe" text="Sign Up" url="/signup" onClick={onClick}/>
            <NavItem icon="bi-globe" text="About us" url="/more" onClick={onClick}/>
        </>
    )
}