
import { FaGithub } from "react-icons/fa";
import BrandFooter from "./BrandFooter";
import SocialMedia from "./SocialMedia";
import TechStack from "./TechStack";

function Footer() {
  return (
    <div className="container">
      <div className="row row-cols-2 row-cols-md-4 gy-5 gx-md-5 gy-md-0">
        <div className="col">
          <BrandFooter />
        </div>
        <div className="col">
          <SocialMedia />
        </div>
        <div className="col">
          <h1>Further Learning</h1>
          <ul>
            <li><a href="https://www.thymeleaf.org/doc/articles/fromhtmltohtmlviahtml.html">Thymeleaf</a></li>
            <li><a href="https://www.freecodecamp.org/news/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5/">Egg or Chicken?</a></li>
            <li><a href="https://stackoverflow.com/questions/52088000/skew-function-in-depth">Skew</a></li>
            <li><a href="https://cidr.xyz/">CIDR</a></li>
          </ul>
        </div>
        <div className="col">
          <TechStack />
        </div>
      </div>
      <div className="row text-center">
        <a href="https://github.com/dmsosa/dmblog"><FaGithub size={"5rem"}/> Source code</a>
      </div>
      <div className="row text-center mt-5">
        <h3>&#169; 2024 dmsosa </h3>
      </div>
    </div>
  );
}

export default Footer;
