import axios from "axios";
import { useState } from "react";

function Login({ setHasAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3300/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={(e) => loginUser(e)}>
      <h2>Login</h2>

      <label>Email: </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password: </label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />

      <button>Login</button>

      <p>
        Don't have an account?{" "}
        <button onClick={() => setHasAccount(false)}>Sign Up</button>
      </p>
    </form>
  );
}
export default Login;
