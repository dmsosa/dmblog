import NavItem from "../NavItem";

export function NotLoggedOptions() {
  const onClick = () => {
    document.getElementById("navbarSupportedContent")?.classList.toggle("show");
    document.body.classList.toggle("nonscroll");
  };
  return (
    <>
      <NavItem
        icon="bi-globe"
        text="Login"
        url="/login"
        onClick={onClick}
      />
      <NavItem
        icon="bi-globe"
        text="Sign Up"
        url="/register"
        onClick={onClick}
      />
      <NavItem
        icon="bi-globe"
        text="About us"
        url="/more"
        onClick={onClick}
      />
    </>
  );
}
