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
    <div className="container pt-5">
      <div className="row auth-page-logo mb-5"><GiFishBucket fontSize={25}/></div>
      <div className="row auth-page-title mb-5">{title}</div>
      <div className="row auth-page-form mb-5">
          {children}
      </div>
      <div className="row pb-5">
        <button className="btn btn-info">
          <Link to={path}>{message}</Link>
        </button>
      </div>
    </div>
  );
}
export default AuthPageContainer;
