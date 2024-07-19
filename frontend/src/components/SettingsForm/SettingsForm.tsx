import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { TAuthContext, useAuth } from "../../context/AuthContext";
import FormFieldset from "../FormFieldset";
import { updateUser } from "../../service/userService";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import CustomSelectImage from "../ChooseImage/CustomSelectImage";
import Avatar from "../Avatar";


function SettingsForm() {

    const navigate = useNavigate();
    const { authState, setAuthState } = useAuth() as TAuthContext;
    const { headers, isAuth, loggedUser } = authState;
    const [ { username, email, bio, icon, backgroundColor  }, setForm ] = useState(loggedUser);
    const [ image, setImage ] = useState<File | string>("")
    const [ backgroundImage, setBackgroundImage ] = useState<File | string>("")
    const [ active, setActive ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState("");
    const { imageUrl } = loggedUser;


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
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("bef", backgroundImage)

        if (e.target.files) {
            if (e.target.name === "backgroundImage") {
                setBackgroundImage(e.target.files[e.target.files.length-1]);
            } else {
                setImage(e.target.files[e.target.files.length-1]);
            }
        }
        console.log("after", backgroundImage)
    }

    const handleCustomSelectClick = (e: MouseEvent<HTMLDivElement>) => {
        const iconClicked = e.currentTarget.classList.toString().split("bg-")[1];
        setForm((prev) => ({...prev, icon: iconClicked}));
    }

    const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!active || !headers ) return;


        updateUser({headers, username, email, bio, image, backgroundImage, icon, backgroundColor })
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
                <Avatar imageUrl={imageUrl} username={username}/>
                <form className="form-cont" onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="fieldset-images">
                            <FormFieldset
                            title="Upload Image"
                            name="profileImage"
                            value={image}
                            type="file"
                            changeHandler={handleFileChange}
                            >
                            </FormFieldset>
                            <CustomSelectImage imageUrl={imageUrl} changeHandler={handleCustomSelectClick}/>
                        </div>
                        <FormFieldset
                        title="Background Image"
                        type="file"
                        name="backgroundImage"
                        value={backgroundImage}
                        changeHandler={handleFileChange}
                        >
                        </FormFieldset>
                        <FormFieldset
                        title="Background Color"
                        type="color"
                        name="backgroundColor"
                        value={backgroundColor}
                        changeHandler={handleChange}
                        >
                        </FormFieldset>
                        <FormFieldset
                        title="Change username"
                        name="username"
                        value={username}
                        placeholder="Your username"
                        changeHandler={handleChange}
                        type="text"
                        minLength={3}
                        maxLength={25}
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
                            onChange={handleChange}
                            minLength={10}
                            maxLength={30000}>
                            </textarea>
                        </fieldset>
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