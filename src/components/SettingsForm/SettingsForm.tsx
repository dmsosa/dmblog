import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import FormFieldset from "../FormFieldset";
import { updateUser, uploadProfileImage } from "../../service/userService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../service/handleError";
import CustomSelectImage from "../ChooseImage/CustomSelectImage";
import CurrentImage from "../ChooseImage/CurrentImage";


function SettingsForm() {

    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const { headers, isAuth, loggedUser } = authState;
    const [ { username, email, bio, password, image }, setForm ] = useState(loggedUser);
    const [ profileImageFile, setProfileImageFile ] = useState<File | undefined>(undefined)
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
    
    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfileImageFile(e.target.files[e.target.files.length-1]);
        }
    }

    const handleCustomSelectClick = (e: MouseEvent<HTMLDivElement>) => {
        const imageClicked = e.currentTarget.classList.toString().split("bg-")[1];
        setForm((prev) => ({...prev, image: imageClicked}));
    }

    const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!active || !headers ) return;

        if (profileImageFile) {
            console.log(profileImageFile)
            uploadProfileImage({ profileImageFile, username, headers})
            .then(() => {
                console.log("profile image uploaded successfully")
            })
            .catch((err) => errorHandler(err));
        }

        updateUser({headers, username, email, bio, image, password })
        .then((loggedIn) => {setAuthState(loggedIn);})
        .catch((error: AxiosError) => { setErrorMessage(error.message) })
        .finally(() => {
            location.reload();
            setActive(false)
        });
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
                <CurrentImage image={image}/>
                <form className="form-cont" onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="fieldset-images">
                            <FormFieldset
                            title="Upload Image"
                            name="profileImage"
                            value={profileImageFile}
                            type="file"
                            changeHandler={handleImageFileChange}
                            >
                            </FormFieldset>
                            <CustomSelectImage image={image} changeHandler={handleCustomSelectClick}/>
                        </div>
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
                    </fieldset>
                    <div className="form-btns">
                        <button type="submit" className="btn btn-primary" disabled={!active}>Save changes</button>
                        <button className="btn" onClick={comeBack}>Come back</button>
                    </div>
                </form>
            </div>
        </>
        )
}

export default SettingsForm;