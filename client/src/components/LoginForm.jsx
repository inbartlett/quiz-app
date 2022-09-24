import axios from "axios";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    axios
      .post("http://localhost:8800/user/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <form>
      <h1>Login</h1>

      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" onClick={loginUser}>
        Submit
      </button>
    </form>
  );
}
export default LoginForm;
