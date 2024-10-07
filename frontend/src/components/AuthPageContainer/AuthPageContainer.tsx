import { ReactNode } from "react";
import { Link } from "react-router-dom";
import apple from "../../assets/img/profile/apple.svg";

function AuthPageContainer({
  children,
  title,
  path,
  message,
}: {
  children: ReactNode | ReactNode[];
  title: string;
  path: string;
  message: string;
}) {
  return (
    <div className="auth-page-container container pt-5">
      <div className="row auth-page-logo mb-5"><img src={apple} alt="dmblog's logo"></img></div>
      <div className="row auth-page-title mb-5"><h1>{title}</h1></div>
      <div className="row mb-5 my-0 mx-auto">
          {children}
      </div>
      <div className="row auth-page-btn">
        <button className="btn btn-info">
          <Link to={path}>{message}</Link>
        </button>
      </div>
    </div>
  );
}
export default AuthPageContainer;
