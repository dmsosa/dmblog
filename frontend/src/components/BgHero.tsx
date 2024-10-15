import { Link } from "react-router-dom";

function BgHero() {

  return (
    <div className="bg-hero">
      <h1>DMBLOG</h1>
      <p>"Genie ist 1% Inspiraton und 99% Transpiration"</p>
      <Link className="btn btn-dark" to={"/register"}>Get started</Link>
    </div>
  );
}

export default BgHero;
