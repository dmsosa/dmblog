import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/userService";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { ChangeEvent, FormEvent, useState } from "react";
import FormFieldset from "../FormFieldset";
import { AxiosError } from "axios";
import { createApiError } from "../../service/errorHandler";
import { IoMdEye, IoMdEyeOff  } from "react-icons/io";


type TLoginData = {
  login: string;
  password: string;
};
function LoginForm({ setWithOAuth }: { setWithOAuth: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [{ login, password }, setLoginData] = useState<TLoginData>({
    login: "",
    password: "",
  });
  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const { setAuthState } = useAuth() as TAuthContext;
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible)
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = { login: login, password: password };
    loginUser(loginData)
      .then((loggedState) => {
        setAuthState(loggedState);
        navigate("/");
      })
      .catch((e: AxiosError) => {
        const apiError = createApiError(e);
        setErrorMessage(apiError.getCause()?.message || apiError.getDefaultMessage());
      });
  };
  const comeBack = () => {
    navigate("/");
  };
  return (
      <form className="form-cont" onSubmit={handleSubmit}>
        <div className={`error-message ${errorMessage.length > 0 ? 'active' : ''}`} >{errorMessage}</div>
        <FormFieldset
          id="loginInput"
          name="login"
          title="username or email"
          value={login}
          placeholder="give in the data"
          changeHandler={handleChange}
          type="text"
        ></FormFieldset>
        <FormFieldset
          id="loginPassword"
          name="password"
          title="password"
          value={password}
          placeholder="your hypersecret password"
          changeHandler={handleChange}
          type={passwordVisible ? "text" : "password"}
        >
          <button className="toggle-password" onMouseDown={togglePassword} onMouseUp={togglePassword}>{passwordVisible ? <IoMdEye color="white"/> : <IoMdEyeOff color="white"/>}</button>
        </FormFieldset>
        <label htmlFor="remember" className="form-checkbox-label">
          Remember me
          <input type="checkbox" id="remember" />
          <span className="checkbox-span checkmark"></span>
        </label>
        <button type="submit" className="btn btn-primary form-btn">
          Login
        </button>
        <button className="btn form-btn" onClick={comeBack}>
          Come back
        </button>
        <div className="login-form-footer">
              <p>or</p>
              <hr></hr>
              <div className="link" onClick={() => { setWithOAuth(true) }}>Continue with Facebook or GitHub</div>
          </div>
      </form>
  );
}

export default LoginForm;
