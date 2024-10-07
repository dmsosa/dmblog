import { FaAppleAlt } from "react-icons/fa";

function BrandFooter() {
    return (
        <>
        <div className="footer-brand"><a href="/"><FaAppleAlt color="#b50920" size={"3rem"}/><span>Dmblog</span></a></div>
        <ul>
            <li><a>Version: <span>0.0.1</span></a></li>
            <li><a>Author: <span>Durian Sosa</span></a></li>
            <li><a>Development: <span>2023 - current</span></a></li>
            <li><a href="https://opensource.org/license/mit">License: <span>MIT License</span></a></li>
        </ul>
        </>
    );
  }
  
  export default BrandFooter;
  