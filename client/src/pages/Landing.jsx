import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Landing() {
  return (
    <main>
      <h1>Quiz App</h1>
      <h2>By: Isaiah Bartlett, Lukas Smith, Zachary Duncan, Mason Dunn</h2>
      <button>Get Started</button>
      <button>Login</button>
      <RegisterForm />
      <LoginForm />
    </main>
  );
}
export default Landing;
