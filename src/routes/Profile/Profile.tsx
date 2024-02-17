import ContainerRow from "../../components/ContainerRow";
import NavItem from "../../components/NavItem";
import {  Outlet, useLocation } from "react-router-dom";

function Profile() {
    const { state } = useLocation();


    return (
    <div className="profile-cont">
        <div className="profile-info">
            <ContainerRow>
                <div className="col">UserInfo</div>
            </ContainerRow>
        </div>
        <ContainerRow>
            <div className="profile-toggler">
                <ul className="profile-ul">
                    <NavItem text="Articles" url="" state={state}/>
                    <NavItem text="Favorite Articles" url="favorites" state={state}/>
                </ul>
            </div>
            <Outlet/>
        </ContainerRow>

    </div>
    )

  
}


export default Profile;