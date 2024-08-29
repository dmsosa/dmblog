import { DiGithubAlt } from "react-icons/di";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

function SocialMedia() {
  return (
    <div className="footer-col col-12 socialmedia">
      <ul>
        <li>
          <a>
            <DiGithubAlt size={40} />
          </a>
        </li>
        <li>
          <a>
            <FaInstagram size={40} />
          </a>
        </li>{" "}
        <li>
          <a>
            <FaLinkedin size={40} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SocialMedia;
