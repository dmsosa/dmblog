import LoginForm from "../components/Form/LoginForm";
import AuthPageContainer from "../components/AuthPageContainer";
import { useState } from "react";
import OAuth2Form from "../components/Form/OAuth2Form";

function Login() {
  const [ withOAuth, setWithOAuth ] = useState(false);
  return (
    withOAuth ? 
      <OAuth2Form setWithOAuth={setWithOAuth}></OAuth2Form> 
      :
      <AuthPageContainer
        title="Log into it!"
        message="need an account?"
        path="/register"
      >
        <LoginForm setWithOAuth={setWithOAuth}></LoginForm>
      </AuthPageContainer>
  );
}

export default Login;
