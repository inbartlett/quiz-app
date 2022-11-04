import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { auth } = useAuth();
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchClasses = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${auth.id}/classes`, {
          signal: controller.signal,
        });
        isMounted && setClasses(response.data.classes);
        setLoading(false);
      } catch (error) {
        navigate("/");
      }
    };
    fetchClasses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const createClass = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosPrivate.post("/classes/create", {
        courseName: className,
      });

      setClasses([...classes, response.data.class]);
      setClassName("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  return !loading ? (
    <div>
      {console.log(auth)}
      <h1>Dashboard</h1>
      <h2>Hello, {auth.displayName}.</h2>
      <h3>Classes</h3>
      {classes.map((classObj, index) => (
        <h4 key={index} onClick={() => navigate(`/class/${classObj._id}`)}>
          {classObj.courseName}
        </h4>
      ))}

      <form onSubmit={(e) => createClass(e)}>
        <h3>Create a class</h3>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button>Create a class</button>
      </form>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
export default Dashboard;
