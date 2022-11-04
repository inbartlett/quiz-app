import axios from "axios";
import { useState } from "react";

function Register({ setHasAccount }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3300/api/users/register",
        {
          firstName,
          lastName,
          email,
          password,
          isInstructor,
        }
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsInstructor(false);
      setHasAccount(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={(e) => registerUser(e)}>
      <h2>Register</h2>

      <label>First Name: </label>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />

      <label>Last Name: </label>
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />

      <label>Email: </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password: </label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} />

      <label>Confirm Password: </label>
      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <label>I am a(n): </label>
      <select onChange={(e) => setIsInstructor(e.target.value)}>
        <option value={false}>Student</option>
        <option value={true}>Instructor</option>
      </select>

      <button>Create Account</button>

      <p>
        Already have an account?{" "}
        <button onClick={() => setHasAccount(true)}>Login</button>
      </p>
    </form>
  );
}
export default Register;
