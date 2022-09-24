import { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);

  // This function runs when we submit our form
  const registerUser = async () => {
    axios
      // We need to send data to our server endpoint
      .post("http://localhost:8800/user/register", {
        username,
        email,
        password,
        isInstructor,
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
      <h1>Register</h1>

      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

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

      <input type="checkbox" onClick={() => setIsInstructor(!isInstructor)} />
      <label>Instructor?</label>

      <button type="button" onClick={registerUser}>
        Submit
      </button>
    </form>
  );
}
export default RegisterForm;
