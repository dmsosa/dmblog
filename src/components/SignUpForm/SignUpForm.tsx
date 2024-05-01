import { FormEvent, useEffect, useState } from "react";
import FormFieldset from "../FormFieldset";
import { useNavigate } from "react-router-dom";
import { authorizeWith, signUpUser } from "../../service/userService";
import { TAuthContext, useAuth } from "../../context/AuthContext";


function SignUpForm( {onError} : {onError: (error: Error) => void} ) {

    const { setAuthState } = useAuth() as TAuthContext;
    const navigate = useNavigate();

    //formState
    const [{ username, email, password }, setFormState] = useState(
        {
            username: "",
            email: "",
            image: "",
            password: ""
        }
    )

    useEffect(() => {
        const href = window.location.href;
        if (href.includes("registration_credentials") ) {
            let formState = {
                username: "",
                email: "",
                image: ""
            };
            let regex = /([^&=]+)=([^&]*)/g, match;
            while (match = regex.exec(href)) {
                switch(match[1]) {
                    case "username": {
                        formState.username = decodeURI(match[2]);
                        break
                    }
                    case "email": {
                        if (decodeURI(match[2]) === "null") {
                            break
                        }
                        formState.email = decodeURI(match[2]);
                        break
                    }
                }
            }
            setFormState((prev) => ({...prev, username: formState.username, email: formState.email, image: formState.image }))

            window.history.pushState(formState, "", "/signup");
            
        }
        
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {

        e.preventDefault();

        const userData = {username: username, email: email, bio: "", image: "", password: password};
        signUpUser({userData})
        .then((loggedState) => {
            setAuthState(loggedState);
            navigate("/");
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

    const handleOAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        const name = e.currentTarget.innerText;
        switch (name) {
            case "Continue with Google": { 
                authorizeWith("google"); 
                break
            };
            case "Continue with GitHub": { 
                authorizeWith("github"); 
                break
            }
            case "Continue with Facebook": { 
                authorizeWith("facebook"); 
                break
            }
        }
        
    }

    const comeBack = () => {
        navigate("/")
    }
    return (
        <div className="row">
            <div className="col">
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
                </form>
                <div className="row row-cols-3 g-2">
                    <div className="col">
                        <button className="btn btn-google" onClick={handleOAuth}>Continue with Google</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-github" onClick={handleOAuth}>Continue with GitHub</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-facebook" onClick={handleOAuth}>Continue with Facebook</button>
                    </div>
                </div>
                <button className="btn form-btn" onClick={comeBack}>Come back</button>
            </div>
        </div>
        
    )
}

export default SignUpForm;