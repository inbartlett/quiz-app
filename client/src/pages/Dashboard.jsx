import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import CreateClass from "../components/CreateClass";
import { useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [creatingClass, setCreatingClass] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      axios.get(`http://localhost:8800/user/${user._id}`).then((response) => {
        setClasses(response.data.classes);
        setLoading(false);
      });
    };
    fetchClasses();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Dashboard</h1>
          <h2>{user._id}</h2>
          {user ? (
            <div>
              <p>Hello, {user.username}</p>
              <p>
                {user.isInstructor
                  ? "You are an instructor"
                  : "You are a student"}
              </p>
            </div>
          ) : (
            <p>You are not signed in</p>
          )}
          <div>
            {console.log(classes)}
            {classes.map((classObj) => (
              <h2 onClick={() => navigate(`/class/${classObj._id}`)}>
                {classObj.courseName}
              </h2>
            ))}
          </div>

          {user.isInstructor ? (
            <button onClick={() => setCreatingClass(true)}>
              Create a new class
            </button>
          ) : null}
          {creatingClass && <CreateClass />}
        </div>
      )}{" "}
    </div>
  );
}
export default Dashboard;
