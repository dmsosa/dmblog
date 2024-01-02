import { TAuthContext, useAuth } from "../context/AuthContext";
import { loginUser } from "../service/loginUser";
import apple from "../assets/apple.svg";
import NavbarLarge from "../components/Navbar/NavbarLarge";
import Navbar from "../components/Navbar/Navbar";

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

            "Genie ist 1% Inspiration und 99% Transpiration"
            <h1>
                Hello {loggedUser?.username}
            </h1>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
            </svg>
            <button 
            className="btn btn-primary"
            onClick={func}>Change me</button>       
            <div className="container">
                <div className="row">
                    <div className="col">Ja</div>
                    <div className="col">Genau</div>
                    <div className="col">Genau</div>
                </div>
            </div>
            <div></div>
            "Genie ist 1% Inspiration und 99% Transpiration"
            <h1>
                Hello {loggedUser?.username}
            </h1>
            <button 
            className="btn btn-primary"
            onClick={func}>Change me</button>       
            <div className="container">
                <div className="row">
                    <div className="col">Ja</div>
                    <div className="col">Genau</div>
                    <div className="col">Genau</div>
                </div>
            </div>
            <div></div>
            "Genie ist 1% Inspiration und 99% Transpiration"
            <h1>
                Hello {loggedUser?.username}
            </h1>
            <button 
            className="btn btn-primary"
            onClick={func}>Change me</button>       
            <div className="container">
                <div className="row">
                    <div className="col">Ja</div>
                    <div className="col">Genau</div>
                    <div className="col">Genau</div>
                </div>
            </div>
            <div></div>
            "Genie ist 1% Inspiration und 99% Transpiration"
            <h1>
                Hello {loggedUser?.username}
            </h1>
            <button 
            className="btn btn-primary"
            onClick={func}>Change me</button>       
            <div className="container">
                <div className="row">
                    <div className="col">Ja</div>
                    <div className="col">Genau</div>
                    <div className="col">Genau</div>
                </div>
            </div>
            <div></div>
            "Genie ist 1% Inspiration und 99% Transpiration"
            <h1>
                Hello {loggedUser?.username}
            </h1>
            <button 
            className="btn btn-primary"
            onClick={func}>Change me</button>       
            <div className="container">
                <div className="row">
                    <div className="col">Ja</div>
                    <div className="col">Genau</div>
                    <div className="col">Genau</div>
                </div>
            </div>
            <div></div>
            "Genie ist 1% Inspiration und 99% Transpiration"
            <h1>
                Hello {loggedUser?.username}
            </h1>
            <button 
            className="btn btn-primary"
            onClick={func}>Change me</button>       
            <div className="container">
                <div className="row">
                    <div className="col">Ja</div>
                    <div className="col">Genau</div>
                    <div className="col">Genau</div>
                </div>
            </div>
            <div></div>
            "Genie ist 1% Inspiration und 99% Transpiration"
            <h1>
                Hello {loggedUser?.username}
            </h1>
            <button 
            className="btn btn-primary"
            onClick={func}>Change me</button>       
            <div className="container">
                <div className="row">
                    <div className="col">Ja</div>
                    <div className="col">Genau</div>
                    <div className="col">Genau</div>
                </div>
            </div>
            
        </section>
        </>

    )
}

export default Home;