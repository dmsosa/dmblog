import ColContent from "../ColContent";
import ContainerRow from "../ContainerRow";
import { LiaTruckLoadingSolid } from "react-icons/lia";

function LoadingPage() {
    return (
        <ContainerRow>
            <ColContent
            addClass={"loading-truck"}
            title={"Loading... wait a little bit"}>
                <a className="loading-truck-icon"><LiaTruckLoadingSolid size={70} /></a>
            </ColContent>
        </ContainerRow>
        )
}

export default LoadingPage;