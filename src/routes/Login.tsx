import LoginForm from "../components/LoginForm";
import AuthPageContainer from "../components/AuthPageContainer";
import { useState } from "react";

function Login() {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleError = (error: Error) => {
        setErrorMessage(error.message);
    }
    return (
        <AuthPageContainer
            title="Log into it!"
            message="need an account?"
            path="/sign-up"
            error={errorMessage}
        >
            <LoginForm onError={handleError}></LoginForm>
        </AuthPageContainer>
    )
}

export default Login;