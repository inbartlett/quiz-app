import axios from "axios";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This function runs when we submit our form
  const loginUser = async () => {
    axios
      // We need to send data to our server endpoint
      .post("http://localhost:8800/user/login", {
        email,
        password,
      }) // Since axios returns a promise we can use .then to get the response
      .then((response) => {
        console.log(response.data);
      }) // Same with errors
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
        // Set the input value to be email which starts as ""
        value={email}
        // When ever someone types a letter, update email to that letter
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