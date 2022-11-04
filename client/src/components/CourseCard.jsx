import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function CourseCard({ data }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <div onClick={() => navigate(`/class/${data._id}`)}>
      <h4>{data.courseName}</h4>
      <p>
        {auth.isInstructor == "true" && `${data.students.length - 1} students,`}{" "}
        {data.quizzes.length} quizzes
      </p>
    </div>
  );
}
export default CourseCard;
