import { Outlet } from "react-router-dom";
import BannerContainer from "../components/BannerContainer";
import { TAuthContext, useAuth } from "../context/AuthContext";
import HomeArticles from "./HomeArticles";
import FeedProvider from "../context/FeedContext";
import FeedToggler from "../components/FeedToggler";
import TagList from "../components/TagList/TagList";
import ContainerRow from "../components/ContainerRow";
import { logoutUser } from "../service/userService";



function Home() {
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const { loggedUser } = authState;


    const handleClick  = () => {
        console.log(loggedUser)
        console.log(authState);
        console.log(localStorage.getItem("loggedUser"));
        
        
    }
    return(
        <>
        <section className="bg-hero"> 
            <BannerContainer>
                <div className="banner-quote">
                    <a className="banner-quote-link">"Genie ist 1% Inspiration und 99% Transpiration"</a>
                </div>
            </BannerContainer>
            <a>
                {loggedUser && <span>Hello {loggedUser.username}</span>}
            </a>
            <button onClick={handleClick}>lick</button>
            <ContainerRow
            addClass={"page"}>
                <FeedProvider>
                    <div className="col-6">
                        <FeedToggler/>
                        <Outlet/>
                    </div>
                    
                    <TagList/>
                </FeedProvider>
            </ContainerRow>
            
            


        </section>
        </>

    )
}

export default Home;