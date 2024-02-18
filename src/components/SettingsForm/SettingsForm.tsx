import { ChangeEvent, MouseEvent, useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import FormFieldset from "../FormFieldset";
import { updateUser } from "../../service/userService";
import { AxiosError } from "axios";


function SettingsForm() {

    const { authState, setAuthState } = useAuth() as TAuthContext;
    const { headers, isAuth, loggedUser } = authState;
    const [ { username, email, image, bio, password }, setForm ] = useState(loggedUser);
    const [ errorMessage, setErrorMessage ] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm((prev) => ({...prev, [name]:value }))
    }
    

    const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateUser({headers, username, email, image, bio, password })
        .then((loggedIn) => {
            setAuthState(loggedIn)
        })
        .catch((error: AxiosError) => { setErrorMessage(error.message) })
    }
    return (
        <div className="row">
            {errorMessage && <h1>Error! <p>{errorMessage}</p></h1>}
            <form className="settings-form" onSubmit={handleSubmit}>
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
                    <button type="submit">Save changes</button>
                </fieldset>
        </form>
        </div>

    )
}

export default SettingsForm;