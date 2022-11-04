import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import QuizBuilder from "../components/QuizBuilder";

function Class() {
  const axiosPrivate = useAxiosPrivate();
  const [quizName, setQuizName] = useState("");
  const { auth } = useAuth();
  const { classId } = useParams();
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3300/api/classes/${classId}/quizzes`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        isMounted && setQuizzes(response.data.quizzes);
        setLoading(false);
      } catch (error) {
        navigate("/");
      }
    };
    fetchQuizzes();

    return () => {
      isMounted = false;
    };
  }, []);

  const createQuiz = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosPrivate.post(`/quizzes/${classId}/create`, {
        quizName,
        questions: [
          {
            prompt: "What's 1 + 1?",
            choices: [1, 2, 3, 4],
            answer: 2,
          },
        ],
      });

      setQuizzes([
        ...quizzes,
        {
          quizName,
          questions: [
            {
              prompt: "What's 1 + 1?",
              choices: [1, 2, 3, 4],
              answer: 2,
            },
          ],
        },
      ]);
      setQuizName("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Your quizzes</h1>
      {auth.isInstructor ? (
        <button onClick={() => navigate(`/class/${classId}/quiz/create`)}>
          Create Quiz
        </button>
      ) : // <form onSubmit={(e) => createQuiz(e)}>
      //   <h3>Create a quiz</h3>
      //   <label>Quiz Name: </label>
      //   <input
      //     type="text"
      //     value={quizName}
      //     onChange={(e) => setQuizName(e.target.value)}
      //   />
      //   <button>Create a quiz</button>
      // </form>
      null}
      <div>
        {quizzes.map((quiz) => (
          <h1>
            <Link to={`/class/${classId}/quiz/${quiz._id}`}>
              {quiz.quizName}
            </Link>
          </h1>
        ))}
      </div>
    </div>
  );
}
export default Class;
