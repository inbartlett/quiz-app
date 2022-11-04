import axios from "./utils/axios";
import { useState } from "react";
import useAuth from "./hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "/users/login",
        {
          email: "jeff@email.com",
          password: "password",
        },
        {
          withCredentials: true,
        }
      );

      const id = response.data.id;
      const displayName = response.data.displayName;
      const accessToken = response.data.accessToken;
      const isInstructor = response.data.isInstructor;
      setAuth({ id, displayName, isInstructor, accessToken });
      console.log({ id, displayName, accessToken });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const registerUser = async () => {
    const response = await axios.post(
      "http://localhost:3300/api/users/register",
      {
        firstName: "Mason",
        lastName: "Dunn",
        email: "mason@email.com",
        password: "password",
        isInstructor: false,
      }
    );

    console.log(response.data);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      <div>
        <button onClick={loginUser}>login</button>
        <button onClick={registerUser}>register</button>
      </div>
    </div>
  );
}

export default Login;
