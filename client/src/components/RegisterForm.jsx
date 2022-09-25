import { useState } from "react";
import Field from "./Field";
import { registerUser } from "../utils/httpRequests";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);

  const handleRegister = (event) => {
    registerUser({
      event,
      firstName,
      lastName,
      email,
      password,
      isInstructor,
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setIsInstructor(false);
  };

  return (
    <form onSubmit={(event) => handleRegister(event)}>
      <h1>Register</h1>

      <Field label="First Name:" value={firstName} setValue={setFirstName} />
      <Field label="Last Name:" value={lastName} setValue={setLastName} />
      <Field label="Email:" value={email} setValue={setEmail} />
      <Field
        label="Password:"
        value={password}
        setValue={setPassword}
        type="password"
      />
      <Field
        label="Are you an instructor?"
        value={isInstructor}
        setValue={setIsInstructor}
        type="checkbox"
      />

      <button>Submit</button>
    </form>
  );
}
export default RegisterForm;
