import { useState } from "react";
import AuthPageContainer from "../components/AuthPageContainer";
import SignUpForm from "../components/SignUpForm";

function Register() {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleError = (error: Error) => {
        setErrorMessage(error.message);
    }
    return (
        <AuthPageContainer
            error={errorMessage}
            title="Come to Duvi!"
            message="already have an account?"
            path="/dmblog/login"
        >
            <SignUpForm onError={handleError}></SignUpForm>
        </AuthPageContainer>
    )
}

export default Register;