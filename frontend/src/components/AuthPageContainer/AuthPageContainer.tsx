import { ReactNode } from "react";
import { Link } from "react-router-dom";

function AuthPageContainer({
  children,
  error,
  title,
  path,
  message,
}: {
  children: ReactNode | ReactNode[];
  error: string;
  title: string;
  path: string;
  message: string;
}) {
  return (
    <div className="container auth-page">
      <div className="row">
        <div className="col col-12">
          <h1>{title}</h1>
          <p className={`error-message ${error ? "active" : ""}`}>{error}</p>
          {children}
        </div>
        <div className="col col-12">
          <button className="btn btn-info">
            <Link to={path}>{message}</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
export default AuthPageContainer;
