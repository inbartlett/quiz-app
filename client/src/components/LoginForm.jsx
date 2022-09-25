import { useState } from "react";
import Field from "./Field";
import { loginUser } from "../utils/httpRequests";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    const response = await loginUser({
      event,
      email,
      password,
    });

    if (response.status !== 200) {
      console.log(response);
    } else {
      setUser(response.user);
      navigate("/dashboard");
    }

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
