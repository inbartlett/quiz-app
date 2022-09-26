import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Class() {
  const { classId } = useParams();
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState(true);

  useEffect(() => {
    axios.get(`/class/${classId}/quizzes`).then((response) => {
      setQuizzes(response.data.quizzes);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Class</h1>
          <h2>Quizzes</h2>
          <div>
            {quizzes.map((quiz) => (
              <h3>
                <Link to={`/class/${classId}/quiz/${quiz.id}`}>
                  {quiz.quizName}
                </Link>
              </h3>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Class;
