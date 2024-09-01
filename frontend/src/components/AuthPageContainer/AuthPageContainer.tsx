import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GiFishBucket } from "react-icons/gi";

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
    <div className="container auth-page">
      <div className="row auth-page-logo"><GiFishBucket fontSize={25}/></div>
      <div className="row auth-page-title">{title}</div>
      <div className="row auth-page-form">
          {children}
      </div>
      <div className="row auth-page-link">
        <button className="btn btn-info">
          <Link to={path}>{message}</Link>
        </button>
      </div>
    </div>
  );
}
export default AuthPageContainer;
