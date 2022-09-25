import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Quiz App</h1>
      <h2>By: Isaiah Bartlett, Lukas Smith, Zachary Duncan, Mason Dunn</h2>
      <button onClick={() => navigate("/register")}>Get Started</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </main>
  );
}
export default Landing;
