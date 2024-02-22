import { FcAndroidOs } from "react-icons/fc";
import NavItem from "../NavItem";
import FooterForm from "./FooterForm";
import SocialMedia from "./SocialMedia";

function Footer() {
    return (
        <div className="container">
            <div className="row mb-3 p-3">
                <SocialMedia/>
            </div>
            <div className="row">
                <FooterForm/>
            </div>
            <div className="row mb-2">
                <ul>
                    <li><a>Terms</a></li>
                    <li><a>Locense</a></li>
                    <li><a>Credits</a></li>
                    <li><a>Agreements</a></li>
                    <li><a>More</a></li>
                </ul>
            </div>
            <div className="row">
                <div className="col text-center"><h5>Copyright</h5></div>
            </div>
        </div>
    )
}

export default Footer;