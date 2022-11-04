function Register({ setHasAccount }) {
  return (
    <form>
      <h2>Register</h2>

      <label>First Name: </label>
      <input />

      <label>Last Name: </label>
      <input />

      <label>Email: </label>
      <input />

      <label>Password: </label>
      <input />

      <label>Confirm Password: </label>
      <input />

      <label>I am a(n): </label>
      <select>
        <option>Student</option>
        <option>Instructor</option>
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
