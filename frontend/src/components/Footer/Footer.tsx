
import { FaGithub } from "react-icons/fa";
import BrandFooter from "./BrandFooter";
import SocialMedia from "./SocialMedia";
import TechStack from "./TechStack";

function Footer() {
  return (
    <div className="container fs-5">
      <div className="row row-cols-2 row-cols-md-4 gy-2 gx-md-5 d-flex flex-wrap">
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
      <div className="row w-75 w-md-25 m-auto d-flex justify-content-between mt-3">
        <div className="col">
          <a href="https://github.com/dmsosa/dmblog"><FaGithub size={"1.7rem"}/> Source code</a>
        </div>
        <div className="col">
          <h5>&#169; 2024 dmsosa </h5>
        </div>
      </div>
    </div>
  );
}

export default Footer;
