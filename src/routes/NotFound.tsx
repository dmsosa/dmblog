import ColContent from "../components/ColContent";
import ContainerRow from "../components/ContainerRow";
import { TbError404 } from "react-icons/tb";

function NotFound() {
    return (
            <ContainerRow
            addClass={"not-found-page"}>
                    <div className="col">
                        <h1>Not found, bruder!</h1>
                        <TbError404 size={50}/>
                    </div>
                    
            </ContainerRow>
        )
}

export default NotFound;