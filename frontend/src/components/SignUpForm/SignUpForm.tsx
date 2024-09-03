import { FormEvent, MouseEvent, useState } from "react";
import FormFieldset from "../FormFieldset";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../service/userService";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import { checkRegisterErrors } from "../../helpers/helpers";

function SignUpForm({ onError }: { onError: (error: Error) => void }) {
  const { setAuthState } = useAuth() as TAuthContext;
  const navigate = useNavigate();

  //formState
  const [{ username, email, password, confirmPassword }, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });



  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const comeBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (checkRegisterErrors({ username, email, password, confirmPassword })) {
      return;
    }
    signUpUser({ username, email, password })
      .then((loggedState) => {
        setAuthState(loggedState);
        navigate("/dmblog");
      })
      .catch((error) => {
        onError(error);
      });
  };
  return (
        <form id="reg-form" className="form-cont" onSubmit={handleSubmit}>
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
        </form>

  );
}

export default SignUpForm;
