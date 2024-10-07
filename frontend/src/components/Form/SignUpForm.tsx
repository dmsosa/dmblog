import { FormEvent, MouseEvent, useEffect, useState } from "react";
import FormFieldset from "../FormFieldset";
import { useNavigate } from "react-router-dom";
import { getUser, signUpUser } from "../../service/userService";
import { checkRegisterErrors } from "../../helpers/helpers";
import { ApiError } from "../../service/errorHandler";
import { TAuthContext, useAuth } from "../../context/AuthContext";


type TForm = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
}
const initForm = { username : "", email: "", password: "", confirmPassword: "" };

function SignUpForm({ setWithOAuth } : { 
  setWithOAuth: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { authState, setAuthState } = useAuth() as TAuthContext;
  const { isAuth } = authState;
  const urlParams = new URLSearchParams(window.location.search);
  const  emailParam = urlParams.get("email");
  const  usernameParam = urlParams.get("username");
  if (emailParam) {
    initForm.email = emailParam;
  }
  if (usernameParam) {
    initForm.username = usernameParam;
  }

  const [ form, setForm ] = useState<TForm>(initForm);
  const [errorMessage, setErrorMessage ] = useState("");
  const { username, email, password, confirmPassword } = form;

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const comeBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const termsAndConditions = document.getElementById("terms") as HTMLInputElement;
    console.log(termsAndConditions)
    if (!termsAndConditions.checked) {
      setErrorMessage("before register, you must agree with the terms and conditions!");
      return;
    }
    if (checkRegisterErrors({ username, email, password, confirmPassword })) {
      return;
    }
    signUpUser({ username, email, password })
      .then((loggedState) => {
        setAuthState(loggedState);
        navigate("/");
      })
      .catch((error: ApiError) => {
        console.log(error, error.getMessage());
      });
  };

  useEffect(() => {
    const token = urlParams.get("token");

    if (!token || isAuth) return;

    function handleToken() {
      const headers = { "Authorization": "Bearer " + token };
      getUser({ headers })
      .then((loggedUser) => {
        const loggedIn = { headers: headers, isAuth: true, loggedUser: loggedUser };
        localStorage.setItem("loggedUser", JSON.stringify(loggedIn));
        setAuthState(loggedIn);
        navigate("/");
      })
      .catch((error: ApiError) => {
        console.log(error.getDefaultMessage());
      });
    }
    window.addEventListener("load", handleToken)
    return () => {
      window.removeEventListener("load", handleToken);
    }

  }, []);

  return (
        <form id="reg-form" className="form-cont" onSubmit={handleSubmit}>
          <div className={`error-message ${errorMessage.length > 0 ? 'active': ''}`}>{errorMessage}</div>
          <FormFieldset
            id="reg-form-username"
            name="username"
            title="username"
            value={username}
            type="text"
            placeholder={"A cool username"}
            autoFocus={true}
            changeHandler={handleInput}
            minLength={3}
          ></FormFieldset>
          <FormFieldset
            id="reg-form-email"
            name="email"
            title="email"
            value={email}
            type="email"
            placeholder={"An original email"}
            changeHandler={handleInput}
            minLength={5}
          >
          </FormFieldset>
          <FormFieldset
            id="reg-form-password"
            name="password"
            title="password"
            value={password}
            type="password"
            placeholder={"An unguessable password"}
            changeHandler={handleInput}
            minLength={7}
          ></FormFieldset>
          <FormFieldset
            id="reg-form-confirmPassword"
            name="confirmPassword"
            title="confirm password"
            value={confirmPassword}
            type="password"
            placeholder={"Confirm your password"}
            changeHandler={handleInput}
            minLength={7}
          ></FormFieldset>
          <button type="submit" className="btn btn-primary form-btn" onClick={handleSubmit}>
            Sign up
          </button>
          <button className="btn form-btn" onClick={comeBack}>
            Come back
          </button>
          <div className="form-footer">
            <p>or</p>
            <hr></hr>
            <div className="link" onClick={() => { setWithOAuth(true) }}>Continue with Facebook or GitHub</div>
          </div>
        </form>

  );
}

export default SignUpForm;
