import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/userUtils";
import ColContent from "../ColContent";
import ContainerRow from "../ContainerRow";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { ChangeEvent, FormEvent, useState } from "react";

type TLoginData = {
    login: string,
    password: string
}
function LoginForm() {
    const [{login, password}, setLoginData] = useState<TLoginData>({login: "", password: ""});
    const {setAuthState} = useAuth() as TAuthContext;
    const navigation = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setLoginData((prev) => {...prev, })

    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = { login: }
        loginUser()
    }
    return (
        <ContainerRow>
        <ColContent>
            <form className="cont-form" onSubmit={handleSubmit}>
            <div className="cont-label-input">
                    <label htmlFor="login" className="form-label">Email or Username</label>
                    <input 
                    id="login" 
                    name="login" 
                    className="form-input" 
                    onChange={handleChange} 
                    value={login}>
                    </input>
                </div>
                <div className="cont-label-input">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                    id="password" 
                    name="password" 
                    className="form-input" 
                    onChange={handleChange} 
                    value={password}>
                    </input>
                </div>
                <label htmlFor="remember" className="form-checkbox-label">
                    Remember me
                    <input type="checkbox" id="remember"/>
                    <span className="checkbox-span checkmark"></span>
                </label>
                <button type="submit" className="btn btn-primary form-btn">Login</button>
                <div className="form-footer">
                    <a className="form-footer-link">I forgot my password</a>
                </div>
            </form>
        </ColContent>
    </ContainerRow>
    );
}

export default LoginForm;