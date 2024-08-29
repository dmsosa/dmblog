import NavItem from "../NavItem";
import FooterForm from "./FooterForm";
import SocialMedia from "./SocialMedia";

function Footer() {
  return (
    <div className="container footer-cont">
      <div className="row">
        <SocialMedia />
        <FooterForm />
        <div className="footer-col col-12">
          <ul>
            <NavItem text="Who I am" />
            <NavItem text="More learning" />
            <NavItem text="You would like" />
          </ul>
        </div>
        <div className="col-12 text-center">
          <h5>&#169; 2024 dmsosa </h5>
        </div>
      </div>
    </div>
  );
}

export default Footer;
