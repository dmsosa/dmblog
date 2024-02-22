import { DiReact, DiGithubBadge, DiDjango, DiAws } from "react-icons/di";


function SocialMedia() {
    return (
        <ul className="socialmedia-ul">
            <li className="socialmedia-li">
                <a className="socialmedia-a"><DiAws size={70}/></a>
            </li>
            <li className="socialmedia-li">
                <a className="socialmedia-a"><DiDjango size={70}/></a>
            </li>
            <li className="socialmedia-li">
                <a className="socialmedia-a"><DiReact size={70}/></a>
            </li>
            <li className="socialmedia-li">
                <a className="socialmedia-a"><DiGithubBadge size={70}/></a>
            </li>
        </ul>
    )
}

export default SocialMedia;