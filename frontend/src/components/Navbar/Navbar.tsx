import { useEffect } from "react";
import scrollNavbar from "../../service/scrollNavbar";
import BrandLogo from "./BrandLogo";
import NotLoggedNav from "./NotLoggedNav";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import LoggedNav from "./LoggedNav";
import { logoutUser } from "../../service/userService";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { authState, setAuthState } = useAuth() as TAuthContext;
  const { isAuth, loggedUser } = authState;

  const navigation = useNavigate();

  const handleLogout = () => {
    setAuthState(logoutUser());
    navigation("/");
  }
  useEffect(() => {
    scrollNavbar();
    
  });


  return (
      <nav className="navbar bg-color-blue-nav navbar-expand-md sticky-header nav-shadow">
        <div className="container-fluid">
          <BrandLogo />
          { isAuth ? 
          <LoggedNav
          username={loggedUser.username}
          handleLogout={handleLogout}
            /> :
            <NotLoggedNav />
          }
          
        </div>
      </nav>
  );
}

export default Navbar;
