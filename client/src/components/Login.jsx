import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login({ setHasAccount }) {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/dashboard";
  const from = "/dashboard";

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3300/api/users/login",
        {
          email: "instructor@email.com",
          password: "password",
        },
        {
          withCredentials: true,
        }
      );

      setAuth({ ...data });
      navigate(from, { replace: true });
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
