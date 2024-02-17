import { ChangeEvent, MouseEvent, useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import FormFieldset from "../FormFieldset";
import { updateUser } from "../../service/userService";


function SettingsForm() {

    const { authState, setAuthState } = useAuth() as TAuthContext;
    const { headers, isAuth, loggedUser } = authState;
    const [ { username, email, image, bio, password }, setForm ] = useState(loggedUser);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm((prev) => ({...prev, [name]:value }))
    }

    const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateUser({headers, username, email, image, bio, password })
        .then((updatedUser) => {
            setAuthState({ headers, isAuth, loggedUser: updatedUser })
        })
    }
    return (
        <div className="row">
            <form className="settings-form" onSubmit={handleSubmit}>
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
            value={image || ""}
            placeholder="the URL of your image"
            changeHandler={handleChange}
            type="text"
            ></FormFieldset>
            <FormFieldset
            title="Your profile image"
            name="password"
            value={password}
            placeholder="the URL of your image"
            changeHandler={handleChange}
            type="password"
            ></FormFieldset>
        </form>
        <button type="submit">Save changes</button>
        </div>

    )
}

export default SettingsForm;