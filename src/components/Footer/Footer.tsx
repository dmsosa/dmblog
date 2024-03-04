import { FcAndroidOs } from "react-icons/fc";
import NavItem from "../NavItem";
import FooterForm from "./FooterForm";
import SocialMedia from "./SocialMedia";

function Footer() {
    return (
        <div className="container footer-cont">
            <div className="row">
                <div className="col-12"><SocialMedia/></div>
                <div className="col-12"><FooterForm/></div>
                <div className="col-12">
                    <ul>
                        <li><a>Terms</a></li>
                        <li><a>Locense</a></li>
                        <li><a>Credits</a></li>
                        <li><a>Agreements</a></li>
                        <li><a>More</a></li>
                    </ul>
                </div>
                <div className="col-12 text-center"><h5>Copyright</h5></div>
            </div>
        </div>
    )
}

export default Footer;