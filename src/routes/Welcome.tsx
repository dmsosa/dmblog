import ColContent from "../components/ColContent";
import { ColContentImg } from "../components/ColContent/ColContentImg";
import { ColContentUl } from "../components/ColContent/ColContentUl";
import ContainerRow from "../components/ContainerRow";
import TopicList from "../components/TopicList";
import grow from "../assets/img/grow.png";

function Welcome() {
    return (
        <>
            <ContainerRow>
                <ColContent>
                    <button className="btn btn-primary">Login</button>
                </ColContent>
                <ColContent>
                    <button className="btn btn-primary">Register</button>
                </ColContent>
            </ContainerRow>
            <ContainerRow>
                <ColContent
                addClass={""} 
                title={"Ich bin Duvi!"}
                >
                    <div className="cont-content">
                        <h2>Code lernen</h2>
                        <h5>Durch die Bauen dieses Webseite ich habe programmieren gelernt, und ich mochte auch dir hilfen, um alles was du brauchst zu lernen. Eigenlicht, ich bin ja ein backend developer.</h5>
                        <p>Sie sagen dass, man kann ein Mensch ein Phisch geben, oder er angeln lehren... Ich lehre dir angeln gerne. Also, was man braucht, um Code zu lernen?</p>
                        <ul className="cont-ul">
                            <li className="cont-li">Spring</li>
                            <li className="cont-li">PostgreSQL</li>
                            <li className="cont-li">Docker</li>
                            <li className="cont-li">Math</li>
                        </ul>
                    </div>
                </ColContent>
                <TopicList classes=" col-md-3 cont cont-topic"/>
            </ContainerRow>
            <ContainerRow addClass={"cont-three"}>
                <ColContent 
                title={"Wie es gestartet"}
                >
                    <div className="cont-content">
                        <h2>Egg Course</h2>
                    </div>
                    <ColContentUl
                    contList={["Java", "Python", "PseInt"]}
                    />
                </ColContent>
                <ColContent 
                title={"Personelle Projekte"}
                >
                    <div className="cont-content">
                        <h2>GitHub & Platzi</h2>
                    </div>
                    <ColContentImg image={grow}
                    />
                </ColContent>
                <ColContent 
                title={"Was die Nachste ist..."}
                >
                    <div className="cont-content">
                        <h2>Ein Webapp aufbauen</h2>
                        <div>
                            <h4>Myessen projekt</h4>
                        </div>
                    </div>
                </ColContent>
            </ContainerRow>
        </>
    )
}

export default Welcome;