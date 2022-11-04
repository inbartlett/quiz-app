import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Quiz() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [finalAnswers, setFinalAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const { classId, quizId } = useParams();

  const handleNextQuestion = () => {
    let currentState = finalAnswers;
    currentState[questionNumber] = answer;
    setFinalAnswers(currentState);
    setAnswer("");
    if (questionNumber !== quiz.questions.length - 1) {
      setQuestionNumber(questionNumber + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrevQuestion = () => {
    setAnswer("");
    if (questionNumber !== 0) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axiosPrivate.get(
        `http://localhost:3300/api/quizzes/${classId}/${quizId}`
      );
      console.log(response.data);
      setQuiz(response.data.quiz);
      setLoading(false);
    };
    fetchQuiz();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      {!isFinished ? (
        <div>
          <div>
            <h2>{quiz.questions[questionNumber].prompt}</h2>
            {quiz.questions[questionNumber].choices.map((choice) => (
              <div>
                <input
                  type="radio"
                  name={questionNumber}
                  value={choice}
                  onClick={(e) => setAnswer(e.target.value)}
                />
                <label>{choice}</label>
              </div>
            ))}
          </div>
          {questionNumber !== 0 && (
            <button onClick={handlePrevQuestion}>Previous</button>
          )}
          {questionNumber === quiz.questions.length - 1 ? (
            <button onClick={handleNextQuestion}>Submit</button>
          ) : (
            <button onClick={handleNextQuestion}>Next</button>
          )}
        </div>
      ) : (
        <>
          <h1>You are finished</h1>
          <div>
            {Object.keys(finalAnswers).map((answer, num) => (
              <>
                <h3>
                  Question {num + 1}:
                  {finalAnswers[answer] == quiz.questions[num].answer
                    ? "Correct"
                    : "Incorrect"}
                </h3>
                <p>{quiz.questions[num].prompt}</p>
                <p>You chose: {finalAnswers[answer]}</p>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default Quiz;
