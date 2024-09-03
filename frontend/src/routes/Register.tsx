import { useState } from "react";
import AuthPageContainer from "../components/AuthPageContainer";
import SignUpForm from "../components/SignUpForm";
import TermsModal from "../components/SignUpForm/TermsModal";

function Register() {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleError = (error: Error) => {
    setErrorMessage(error.message);
  };
  return (
    <AuthPageContainer
      title="Come to Duvi!"
      message="already have an account?"
      path="/dmblog/login"
    >
      <SignUpForm onError={handleError}></SignUpForm>
      <TermsModal />
    </AuthPageContainer>
  );
}

export default Register;
