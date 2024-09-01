import { useNavigate } from "react-router-dom";
import { loginUser } from "../../service/userService";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { ChangeEvent, FormEvent,  useState } from "react";
import FormFieldset from "../FormFieldset";
import { AxiosError } from "axios";
import { createApiError } from "../../service/errorHandler";
import { IoMdEye, IoMdEyeOff  } from "react-icons/io";


type TLoginData = {
  login: string;
  password: string;
};
function LoginForm() {
  const [{ login, password }, setLoginData] = useState<TLoginData>({
    login: "",
    password: "",
  });
  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const { setAuthState } = useAuth() as TAuthContext;
  const navigation = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = { login: login, password: password };

    loginUser(loginData)
      .then((state) => {
        setAuthState(state);
        navigation("/dmblog");
        window.location.reload();
      })
      .catch((e: AxiosError) => {
        const apiError = createApiError(e);
        setErrorMessage(apiError.getMessage());
      });
  };

  const comeBack = () => {
    navigation("/dmblog");
  };
  return (
      <form className="form-cont" onSubmit={handleSubmit}>
        { errorMessage.length > 0  && <div className="form-error-message">{errorMessage}</div>}
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
          <button className="toggle-password" onClick={() => {setPasswordVisible(!passwordVisible)}}>{passwordVisible ? <IoMdEye color="white"/> : <IoMdEyeOff color="white"/>}</button>
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
        <div className="form-footer">
          <a className="form-footer-link">I forgot my password</a>
        </div>
      </form>
  );
}

export default LoginForm;
