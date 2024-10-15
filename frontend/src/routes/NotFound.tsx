import { TbError404 } from "react-icons/tb";

function NotFound() {
  return (
    <div className="container-fluid">
      <div className="not-found-container container">
        <h1>Not found, bruder!</h1>
        <TbError404 size={50} />
      </div>
    </div>
  );
}

export default NotFound;
