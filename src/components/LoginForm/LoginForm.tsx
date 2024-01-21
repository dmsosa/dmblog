import ColContent from "../ColContent";
import ContainerRow from "../ContainerRow";

function LoginForm() {
    const logUser = () => {

    }
    return (
        <ContainerRow>
        <ColContent>
            <form className="cont-form">
            <div className="cont-label-input">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" className="form-input"></input>
                </div>
                <div className="cont-label-input">
                    <label htmlFor="password" className="form-label">password</label>
                    <input id="password" className="form-input"></input>
                </div>
                <label htmlFor="remember" className="form-checkbox-label">
                    Remember me
                    <input type="checkbox" id="remember"/>
                    <span className="checkbox-span checkmark"></span>
                </label>
                <button type="submit" className="btn btn-primary form-btn" onClick={logUser}>Login</button>
                <div className="form-footer">
                    <a className="form-footer-link">I forgot my password</a>
                </div>
            </form>
        </ColContent>
    </ContainerRow>
    );
}

export default LoginForm;