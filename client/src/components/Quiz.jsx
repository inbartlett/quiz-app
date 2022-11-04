import { useState } from "react";
import quiz from "../sampleQuiz.json";

function Quiz() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answer, setAnswer] = useState("");
  const [finalAnswers, setFinalAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

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

  return (
    <div className="container">
      <p className="warning">
        <strong>WARNING: </strong>
        This quiz will auto-submit if page is left for any reason.
      </p>
      {!isFinished ? (
        <div>
          <div>
            <h2>Question #{questionNumber + 1}</h2>
            <h2>{quiz.questions[questionNumber].prompt}</h2>
            {quiz.questions[questionNumber].choices.map((choice) => (
              <div className="questions">
                <input
                  type="radio"
                  name={questionNumber}
                  value={choice}
                  checked={answer === choice ? true : false}
                  onClick={(e) => setAnswer(e.target.value)}
                />
                <label>{choice}</label>
              </div>
            ))}
          </div>
          {questionNumber !== 0 && (
            <button className="previousButton" onClick={handlePrevQuestion}>
              Previous
            </button>
          )}
          {questionNumber === quiz.questions.length - 1 ? (
            <button className="submitButton" onClick={handleNextQuestion}>
              Submit
            </button>
          ) : (
            <button className="nextButton" onClick={handleNextQuestion}>
              Next
            </button>
          )}
        </div>
      ) : (
        <>
          <h1>You are finished</h1>
          <p>{JSON.stringify(finalAnswers)}</p>
          <div>
            {Object.keys(finalAnswers).map((answer, num) => (
              <>
                <h3>
                  Question {num + 1}:
                  {finalAnswers[answer] === quiz.questions[num].answer
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
