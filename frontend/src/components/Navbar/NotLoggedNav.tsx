import { Link } from "react-router-dom";

function NotLoggedNav() {
  return (
    <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link to={"/login"}>Login</Link></li>
          <li className="nav-item"><Link to={"/register"}>Register</Link></li>
        </ul>
    </div>
  );
}
export default NotLoggedNav;