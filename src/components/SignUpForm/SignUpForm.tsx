import { FormEvent, useState } from "react";
import FormFieldset from "../FormFieldset";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../service/userService";
import { TAuthContext, useAuth } from "../../context/AuthContext";


function SignUpForm( {onError} : {onError: (error: Error) => void} ) {

    const { authState, setAuthState } = useAuth() as TAuthContext;
    const navigate = useNavigate();

    //formState
    const [{ username, email, password }, setFormState] = useState(
        {
            username: "",
            email: "",
            password: ""
        }
    )


    const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {

        e.preventDefault();

        const userData = {username: username, email: email, password: password};
        signUpUser(userData)
        .then((loggedState) => {
            console.log(loggedState);
            setAuthState(loggedState);
            console.log(authState.loggedUser.username, "logged");
        })
        .catch((error) => {
            onError(error);
        }) 
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormState((prev) => ({...prev, [name]: value}));
    }
    return (
        <form onSubmit={handleSubmit}>
            <FormFieldset
                name="username"
                title="username"
                value={username}
                required={true}
                type="text"
                placeholder={"A cool username"}
                autoFocus={true}
                changeHandler={handleInput}
                minLength={3}
            ></FormFieldset>
            <FormFieldset
                name="email"
                title="email"
                value={email}
                required={true}
                type="email"
                placeholder={"An original email"}
                changeHandler={handleInput}
                minLength={5}
            ></FormFieldset>
            <FormFieldset
                name="password"
                title="password"
                value={password}
                required={true}
                type="password"
                placeholder={"An unguessable password"}
                changeHandler={handleInput}
                minLength={7}
            ></FormFieldset>
            <button type="submit" className="btn btn-primary form-btn" >Sign up</button>
            <button type="submit" className="btn btn-danger form-btn">Come back</button>
        </form>
    )
}

export default SignUpForm;