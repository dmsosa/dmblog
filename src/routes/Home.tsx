import { TAuthContext, useAuth } from "../context/AuthContext";
import { loginUser } from "../service/loginUser";
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
        <Navbar/>
        <h1>
            Hello {loggedUser?.username};
        </h1>
        <button 
        className="btn btn-primary"
        onClick={func}>Change me</button>
        </>

    )
}

export default Home;