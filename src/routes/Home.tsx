import { Outlet } from "react-router-dom";
import BannerContainer from "../components/BannerContainer";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { loginUser } from "../service/loginUser";
import HomeArticles from "./HomeArticles";



function Home() {
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const loggedUser = authState.loggedUser;



    return(
        <>
        <section className="bg-hero"> 
            <BannerContainer>
                <div className="banner-quote">
                    <a className="banner-quote-link">"Genie ist 1% Inspiration und 99% Transpiration"</a>
                </div>
            </BannerContainer>
            <a>
                <span>Hello {loggedUser?.username}</span>
            </a>
            <HomeArticles/>


        </section>
        </>

    )
}

export default Home;