import NavItem from "../NavItem";

export function LoggedOptions({
  username,
  handleLogout,
  handleClick,
}: {
  username: string;
  handleLogout: () => void;
  handleClick?: () => void;
}) {
  return (
    <>
      <NavItem
        icon="bi-globe"
        text="Profile"
        url={`/dmblog/profile/${username}`}
        onClick={handleClick}
      />
      <NavItem
        icon="bi-globe"
        text="New Article"
        url="/dmblog/editor"
        onClick={handleClick}
      />
      <NavItem
        icon="bi-globe"
        text="Settings"
        url="/dmblog/settings"
        onClick={handleClick}
      />
      <li className="nav-item">
        <a className="nav-link" role="button" href="" onClick={handleLogout}>
          Logout
        </a>
      </li>
    </>
  );
}
