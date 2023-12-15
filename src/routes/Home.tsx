import { TAuthContext, useAuth } from "../context/AuthContext";
import { loginUser } from "../service/loginUser";

function Home() {
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const loggedUser = authState.loggedUser;
    const  func = () => {
            if (setAuthState != null) {
                loginUser({login: "duvi", password: "123"})
                .then((response) => setAuthState(response))
                .catch(() => {console.log("ERROR")});
            };
    }

    return(
        <>
        <h1>
            Hello {loggedUser?.username};
        </h1>
        <button onClick={func}>Change me</button>
        </>

    )
}

export default Home;