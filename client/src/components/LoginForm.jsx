import { useState } from "react";
import Field from "./Field";
import { loginUser } from "../utils/httpRequests";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    loginUser({
      event,
      email,
      password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={(event) => handleLogin(event)}>
      <h1>Login</h1>

      <Field label="Email:" value={email} setValue={setEmail} />
      <Field
        label="Password:"
        value={password}
        setValue={setPassword}
        type="password"
      />

      <button>Submit</button>
    </form>
  );
}
export default LoginForm;
