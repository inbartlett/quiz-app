import { useNavigate, useParams } from "react-router-dom";

function Class() {
  const navigate = useNavigate();
  // We can grab the current class from the url
  const { classId } = useParams();

  return (
    <div>
      <h1>Class</h1>
      {/* Now we can use the current class in the url for a specific quiz */}
      <p onClick={() => navigate(`/class/${classId}/quiz/quiz1`)}>Quiz 1</p>
      <p onClick={() => navigate(`/class/${classId}/quiz/quiz2`)}>Quiz 2</p>
    </div>
  );
}
export default Class;
