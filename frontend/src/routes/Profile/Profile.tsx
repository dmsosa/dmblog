import { useState } from "react";
import AuthorInfo from "../../components/AuthorInfo";
import ContainerRow from "../../components/ContainerRow";
import NavItem from "../../components/NavItem";
import {  Outlet, useLocation } from "react-router-dom";

type Ttoggle = "articles" | "favs";
function Profile() {
    const { state } = useLocation();
    const [ toggle, setToggle] = useState<Ttoggle>("articles");

    const changeToggle = () => {
        if (toggle === "articles") {
            setToggle("favs");
        } else {
            setToggle("articles")
        }
    }
    return (
    <div className="profile-page">
        <div className="profile-info">
            <ContainerRow>
                <AuthorInfo />
            </ContainerRow>
        </div>
        <ContainerRow>
            <div className="profile-toggler">
                <ul>
                    <NavItem text="Articles" url="" state={state} activeClass={toggle === "articles"} onClick={changeToggle}/>
                    <NavItem text="Favorite Articles" url="favorites" state={state} activeClass={toggle === "favs"} onClick={changeToggle}/>
                </ul>
            </div>
            <Outlet/>
        </ContainerRow>
    </div>
    )

  
}


export default Profile;