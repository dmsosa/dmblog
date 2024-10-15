import { useEffect, useState } from "react";
import { Button, NavbarCollapse, NavbarToggle } from "react-bootstrap";
import SearchItem from "../SearchItem";

function LoggedNav({
  username,
  handleLogout,
}: {
  username: string;
  handleLogout: () => void;

}) {
  const [ show, setShow ] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (show) {
      body.classList.add("nonscroll");
    } else {
      body.classList.remove("nonscroll");
    }
  }, [show])


  return (
    <>
      <NavbarToggle onClick={() => { 
        setShow(!show);
      }}></NavbarToggle>
      <NavbarCollapse className={ show ? "show":""}>
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href={`/editor`}>New Article</a></li>
          <li className="nav-item">
            <SearchItem />
          </li>
          <li className="nav-item"><a className="nav-link" href={`/profile/${username}`}>Profile</a></li>
          <li className="nav-item"><a className="nav-link" href={`/settings/${username}`}>Settings</a></li>
          <li className="nav-item"><Button variant="danger" onClick={handleLogout}>Logout</Button></li>
        </ul>
      </NavbarCollapse>
    </>
);
}

export default LoggedNav;
