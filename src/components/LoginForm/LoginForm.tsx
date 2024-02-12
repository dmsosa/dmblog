import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/userService";
import ColContent from "../ColContent";
import ContainerRow from "../ContainerRow";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { ChangeEvent, FormEvent, useState } from "react";
import FormFieldset from "../FormFieldset";

type TLoginData = {
    login: string,
    password: string
}
function LoginForm( {onError} : {onError: (error: Error) => void} ) {

    const [{login, password}, setLoginData] = useState<TLoginData>({login: "", password: ""});
    const {setAuthState} = useAuth() as TAuthContext;
    const navigation = useNavigate();

    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginData((prev) => ({...prev, [name]:value}))

    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = { login: login, password: password};

        loginUser(loginData).then((state) => setAuthState(state)).catch((e) => {onError(e)});
        navigation("/");
        
    }
    return (
        <ContainerRow>
        <ColContent>
            <form className="cont-form" onSubmit={handleSubmit}>
                <FormFieldset
                    name="login"
                    title="username or email"
                    value={login}
                    placeholder="give in the data"
                    changeHandler={handleChange}
                    type="text"
                    >
                </FormFieldset>
                <FormFieldset
                    name="password"
                    title="password"
                    value={password}
                    placeholder="your hypersecret password"
                    changeHandler={handleChange}
                    type="password">
                </FormFieldset>
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