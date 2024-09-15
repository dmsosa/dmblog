import { useState } from "react";
import AuthPageContainer from "../components/AuthPageContainer";
import SignUpForm from "../components/Form/SignUpForm";
import OAuth2Form from "../components/Form/OAuth2Form";
import TermsModal from "../components/Form/TermsModal";




function Register() {

  const [ withOAuth, setWithOAuth ] = useState(false);

  return (
    withOAuth ?
    <OAuth2Form setWithOAuth={setWithOAuth}/> :
    <AuthPageContainer
      title="Come to Duvi!"
      message={ withOAuth ? "continue with email" : "already have an account?"}
      path="/login"
    >
      <SignUpForm setWithOAuth={setWithOAuth}/>
      <TermsModal />
    </AuthPageContainer>
  );
}

export default Register;
