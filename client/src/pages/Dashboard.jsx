import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../context/UserContext";

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/user/${user.id}/classes`)
      .then((response) => {
        setClasses(response.data.classes);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Dashboard</h1>
          <p>{user ? user.displayName : "You are not logged in."}</p>
          <div>
            {classes.map((classObj) => (
              <h2>{classObj.courseName}</h2>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Dashboard;
