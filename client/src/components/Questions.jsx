import { useState } from "react";

function Questions({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  const handleNextQuestion = () => {
    if (currentQuestion === currentQuestion - 1) return;
    else {
      setAnswers([...answers, selected]);
      setCurrentQuestion(currentQuestion + 1);
    }
    console.log(answers);
  };

  return (
    <div>
      <h1>{questions[currentQuestion].prompt}</h1>
      {questions[currentQuestion].choices.map((choice, index) => (
        <div>
          <input
            type="radio"
            value={index}
            name="quiz"
            onClick={() => setSelected(index)}
          />
          <label>{choice}</label>
        </div>
      ))}
      {currentQuestion < questions.length - 1 && (
        <button onClick={handleNextQuestion}>Next</button>
      )}
      {currentQuestion > 0 && (
        <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
          Back
        </button>
      )}
    </div>
  );
}
export default Questions;
