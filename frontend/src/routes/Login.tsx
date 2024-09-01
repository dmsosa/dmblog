import LoginForm from "../components/LoginForm";
import AuthPageContainer from "../components/AuthPageContainer";

function Login() {
  return (
    <AuthPageContainer
      title="Log into it!"
      message="need an account?"
      path="/dmblog/register"
    >
      <LoginForm></LoginForm>
    </AuthPageContainer>
  );
}

export default Login;
