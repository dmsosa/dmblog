import { useNavigate } from "react-router-dom";
import apple from "../../assets/img/profile/apple.svg";

function BrandLogo() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(import.meta.env.BASE_URL);
  };
  return (
    <a className="navbar-brand text-primary fw-bold align-middle" role="button" onClick={goHome}><img src={apple}/>dmsosa</a>
  );
}

export default BrandLogo;
