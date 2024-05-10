import NavItem from "../NavItem";

export function NotLoggedOptions() {
    const onClick = () => {
        document.getElementById("navbarSupportedContent")?.classList.toggle("show");
        document.body.classList.toggle("nonscroll");
    }
    return (
        <>
            <NavItem icon="bi-globe" text="Login" url="/dmblog/login" onClick={onClick}/>
            <NavItem icon="bi-globe" text="Sign Up" url="/dmblog/signup" onClick={onClick}/>
            <NavItem icon="bi-globe" text="About us" url="/dmblog/more" onClick={onClick}/>
        </>
    )
}