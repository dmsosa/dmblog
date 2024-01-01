import { Link } from 'react-router-dom';
import apple from '../../assets/apple.svg';

function BrandLogo () {
    return (
        <Link 
        className="navbar-brand"
        to="/">
            <img src={apple}
            className="brand-logo"/>
            <span className="brand-name">dmsosa</span> 
        </Link>
    )
}

export default BrandLogo;