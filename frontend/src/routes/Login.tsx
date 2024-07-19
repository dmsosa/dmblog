import LoginForm from "../components/LoginForm";
import AuthPageContainer from "../components/AuthPageContainer";
import { useState } from "react";

function Login() {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleError = (errorMessage: string) => {
        setErrorMessage(errorMessage);
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