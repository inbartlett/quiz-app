import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate } from "react-router-dom";
import CreateCourse from "../components/CreateCourse";
import CourseCard from "../components/CourseCard";

function Dashboard() {
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${auth.id}/classes`, {
          signal: controller.signal,
        });
        isMounted && setCourses(response.data.classes);
        setLoading(false);
      } catch (error) {
        navigate("/");
      }
    };
    fetchCourses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return !loading ? (
    <div>
      <h1>Dashboard</h1>
      <h2>Hello, {auth.displayName}.</h2>
      <h3>Classes</h3>
      {courses.map((classObj, index) => (
        <CourseCard key={index} data={classObj} />
      ))}
      {auth.isInstructor == "true" && (
        <CreateCourse state={{ courses, setCourses }} />
      )}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
export default Dashboard;
