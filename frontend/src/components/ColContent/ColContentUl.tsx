import { ColContentList } from "./ColContentList";

export function ColContentUl({ contList=[""] } : { contList: string[] }) {
    return (
        <ul className="cont-ul">
            <ColContentList contList={contList}></ColContentList>
        </ul>
    )
}