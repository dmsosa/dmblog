import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import FormFieldset from "../FormFieldset";
import { updateUser } from "../../service/userService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";


function SettingsForm() {

    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const { headers, isAuth, loggedUser } = authState;
    const [ { username, email, image, bio, password }, setForm ] = useState(loggedUser);
    const [ active, setActive ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState("");

    useEffect(() => {
        if (!isAuth) {
            alert("You need to login first!");
            navigate("/");
        }
    }, [authState])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm((prev) => ({...prev, [name]:value }))
        setActive(true);
    }
    

    const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!active) return;

        updateUser({headers, username, email, image, bio, password })
        .then((loggedIn) => {setAuthState(loggedIn);})
        .catch((error: AxiosError) => { setErrorMessage(error.message) })
        .finally(() => setActive(false));
    }

    const comeBack = () => {
        navigate("/")
    }
    return (
        <>
            {errorMessage && 
            
                <div className="col">
                    <h1>Error!</h1>
                    <p>{errorMessage}</p>
                </div>}
            <div className="col">
                <form className="form-cont" onSubmit={handleSubmit}>
                    <fieldset>
                        <FormFieldset
                        title="Change username"
                        name="username"
                        value={username}
                        placeholder="Your username"
                        changeHandler={handleChange}
                        type="text"
                        ></FormFieldset>
                        <FormFieldset
                        title="Change email address"
                        name="email"
                        value={email}
                        placeholder="Your email address"
                        changeHandler={handleChange}
                        type="email"
                        ></FormFieldset>
                        <FormFieldset
                        title="Your profile image"
                        name="image"
                        value={image}
                        placeholder="the URL of your image"
                        changeHandler={handleChange}
                        type="text"
                        ></FormFieldset>
                        <fieldset>
                            <textarea
                            className="form-bio"
                            rows={4}
                            placeholder="Brief biography about yourself"
                            name="bio"
                            value={bio}
                            onChange={handleChange}>
                            </textarea>
                        </fieldset>
                        <FormFieldset
                        title="Change your password"
                        name="password"
                        value={password}
                        changeHandler={handleChange}
                        type="password"
                        ></FormFieldset>
                        {active && <button type="submit" className="btn btn-primary form-btn">Save changes</button>}
                        <button className="btn form-btn" onClick={comeBack}>Come back</button>
                    </fieldset>
                </form>
            </div>
        </>
        )
}

export default SettingsForm;