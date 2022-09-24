import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Dashboard() {
  const { user } = useContext(UserContext);
  // The useNavigate hook allows us to change the url without reloading the entire page.
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Hello, {user.username}</p>
          <p>
            {user.isInstructor ? "You are an instructor" : "You are a student"}
          </p>
        </div>
      ) : (
        <p>You are not signed in</p>
      )}
      <div>
        {/* Example of navigate in action using dynamic query params */}
        {/* In the website you can click on these h2's. This will be changed later */}
        <h2 onClick={() => navigate("/class/101")}>CS 101</h2>
        <h2 onClick={() => navigate("/class/151")}>CS 151</h2>
        <h2 onClick={() => navigate("/class/201")}>CS 201</h2>
      </div>
    </div>
  );
}
export default Dashboard;
