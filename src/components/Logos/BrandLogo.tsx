import { useNavigate } from 'react-router-dom';
import apple from '../../assets/img/apple.svg';

function BrandLogo () {

    const navigate = useNavigate();
    const goHome = () => {
        navigate(import.meta.env.BASE_URL);
    }

    return (
        <a 
        className="navbar-brand"
         role="button" 
         onClick={goHome}>
            <img src={apple}
            className="brand-logo"/>
            <span className="brand-name">dmsosa</span> 
        </a>
    )
}

export default BrandLogo;