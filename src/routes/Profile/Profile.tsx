import AuthorInfo from "../../components/AuthorInfo";
import ContainerRow from "../../components/ContainerRow";
import NavItem from "../../components/NavItem";
import {  Outlet, useLocation, useParams } from "react-router-dom";

function Profile() {
    const { state } = useLocation();
    const { username } = useParams();




    return (
        !!username &&
    <div className="profile-cont">
        <div className="profile-info">
            <ContainerRow>
                <AuthorInfo username={username}/>
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