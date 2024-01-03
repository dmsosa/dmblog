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
            <div className="container">
                <div className="row">
                    <div className="content-quote">
                        <a className="content-quote-link">"Genie ist 1% Inspiration und 99% Transpiration"</a>
                    </div>
                </div>
            </div>
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
                    <div className="col">
                        <div className="container-header">
                            <h1>Spring</h1>
                        </div>
                        <div className="container-content">
                            <ul className="content-ul">
                                <li>Was ist das?</li>
                                <li>Warum wir es nutzen?</li>
                                <li>Wann wir es nutzen ?</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="container-header">
                            <h1>Math</h1>
                        </div>
                        <div className="container-content">
                            <ul className="content-ul">
                                <li>Was ist das?</li>
                                <li>Warum wir es nutzen?</li>
                                <li>Wann wir es nutzen ?</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="container-header">
                            <h1>Science</h1>
                        </div>
                        <div className="container-content">
                            <ul className="content-ul">
                                <li>Was ist das?</li>
                                <li>Warum wir es nutzen?</li>
                                <li>Wann wir es nutzen ?</li>
                            </ul>
                        </div>
                    </div>
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