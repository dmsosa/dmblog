import { FormEvent, useState } from "react";
import FormFieldset from "../FormFieldset";
import { useNavigate } from "react-router-dom";
import { errorHandler, signUpUser } from "../../service/userUtils";
import { TAuthContext, useAuth } from "../../context/AuthContext";


function SignUpForm() {

    const { setAuthState } = useAuth() as TAuthContext;
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
        .then((loggedUser) => {
            if (setAuthState) {
                setAuthState(loggedUser);
                navigate("/");

            }
        })
        .catch((error) => {
            errorHandler(error);
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
                normal={true}
                name="username"
                value={username}
                required={true}
                type="text"
                placeholder={"A cool username"}
                autoFocus={true}
                changeHandler={handleInput}
                minLength={5}
            ></FormFieldset>
            <FormFieldset
                normal={true}
                name="email"
                value={email}
                required={true}
                type="email"
                placeholder={"An original email"}
                autoFocus={true}
                changeHandler={handleInput}
                minLength={5}
            ></FormFieldset>
            <FormFieldset
                normal={true}
                name="password"
                value={password}
                required={true}
                type="password"
                placeholder={"An unguessable password"}
                autoFocus={true}
                changeHandler={handleInput}
                minLength={7}
            ></FormFieldset>
            <button>Sign up</button>
            <button>Come back</button>
        </form>
    )
}

export default SignUpForm;