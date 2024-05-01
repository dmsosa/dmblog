import { Outlet } from "react-router-dom";
import FeedProvider from "../context/FeedContext";
import FeedToggler from "../components/FeedToggler";
import TagList from "../components/TagList/TagList";
import ContainerRow from "../components/ContainerRow";



function Home() {
    return(
        <>
        <section className="bg-hero"> 
            <ContainerRow>
                <div className="banner-quote">
                    <h1>"Genie ist 1% Inspiration und 99% Transpiration"</h1>
                </div>
            </ContainerRow>
            <ContainerRow
            addClass={"page"}>
                <div className="row row-cols-2 page-feed">
                    <FeedProvider>
                        <div className="col-8 cont-feed">
                            <FeedToggler/>
                            <Outlet/>
                        </div>
                        <TagList/>
                    </FeedProvider>
                </div>
            </ContainerRow>
            
            


        </section>
        </>

    )
}

export default Home;