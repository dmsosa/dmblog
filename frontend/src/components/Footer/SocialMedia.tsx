import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function SocialMedia() {
    return (
        <>
        <h1>Social Media</h1>
        <ul>
            <li><a href="https://www.facebook.com/profile.php?id=100082576217258"><FaFacebook/>Facebook</a></li>
            <li><a href="https://github.com/dmsosa"><FaGithub/>GitHub</a></li>
            <li><a href="https://www.instagram.com/duvi_official/?hl=de"><FaInstagram/>Instagram</a></li>
            <li><a href="https://www.linkedin.com/in/durian-sosa-807147241/"><FaLinkedin/>LinkedIn</a></li>
        </ul>
        </>
    );
  }
  
  export default SocialMedia;