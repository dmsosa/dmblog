import BannerContainer from "../components/BannerContainer";
import ColContent from "../components/ColContent";
import ContainerRow from "../components/ContainerRow";
import TopicList from "../components/TopicList";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { loginUser } from "../service/loginUser";


function Home() {
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const loggedUser = authState.loggedUser;
    const  func = () => {
            if (setAuthState != null) {
                loginUser({login: "duvi", password: "123"})
                .then((response) => setAuthState(response))
                .catch(() => {console.log("ERROR ")});
            };
    }


    return(
        <>
        <section className="bg-hero"> 
            <BannerContainer>
                <div className="banner-quote">
                    <a className="banner-quote-link">"Genie ist 1% Inspiration und 99% Transpiration"</a>
                </div>
            </BannerContainer>
            <h1>
                Hello {loggedUser?.username}
            </h1>
            <ContainerRow>
                <ColContent 
                title={"hallo"}
                contList={["genau", "warum"]}>
                    <div>
                        <h2>etwas</h2>
                    </div>
                </ColContent>
            </ContainerRow>
            <TopicList classes=""/>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
            </svg>
        </section>
        </>

    )
}

export default Home;