import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Questions from "../components/Questions";

function Quiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {
    axios.get(`/quiz/${quizId}`).then((response) => {
      setQuiz(response.data.quiz);
      setLoading(false);
    });
  });

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{quiz.quizName}</h1>
          <p>There are {quiz.questions.length} questions.</p>
          <button onClick={() => setStartQuiz(true)}>Start quiz</button>
          {startQuiz && <Questions questions={quiz.questions} />}
        </div>
      )}
    </div>
  );
}
export default Quiz;
