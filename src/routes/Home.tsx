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
        "Genie ist 1% Inspiration und 99% Transpiration"
        <h1>
            Hello {loggedUser?.username}
        </h1>
        <button 
        className="btn btn-primary"
        onClick={func}>Change me</button>
        <div className="container">
            <div className="paragraph-container">
                <h1 className="paragraph-h1">Duvi Seite</h1>
                <h3 className="paragraph-h3">Und warum Lernen ist cool</h3>
                <p className="paragraph-p">Zum Anderen lehren ist Das beste Weg, um etwas neues zu lernen</p>
                <img className="paragraph-img" src={apple}/>
            </div>
        </div>
        <div className="container">
            <div className="paragraph-container">
                <h1 className="paragraph-h1">Duvi Seite</h1>
                <h3 className="paragraph-h3">Und warum Lernen ist cool</h3>
                <p className="paragraph-p">Zum Anderen lehren ist Das beste Weg, um etwas neues zu lernen</p>
                <img className="paragraph-img" src={apple}/>
            </div>
        </div>
        <div className="container">
            <div className="paragraph-container">
                <h1 className="paragraph-h1">Duvi Seite</h1>
                <h3 className="paragraph-h3">Und warum Lernen ist cool</h3>
                <p className="paragraph-p">Zum Anderen lehren ist Das beste Weg, um etwas neues zu lernen</p>
                <img className="paragraph-img" src={apple}/>
            </div>
        </div>
        </>

    )
}

export default Home;