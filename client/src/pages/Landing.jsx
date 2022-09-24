import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Landing() {
  const [newUser, setNewUser] = useState(false);
  const [existingUser, setExistingUser] = useState(false);

  return (
    <div>
      <h1>Quiz App</h1>
      {newUser && <RegisterForm />}
      {existingUser && <LoginForm />}
      <div>
        <button
          onClick={() => {
            setNewUser(true);
            setExistingUser(false);
          }}
        >
          Get Started
        </button>
        <button
          onClick={() => {
            setNewUser(false);
            setExistingUser(true);
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default Landing;
