import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function QuizBuilder() {
  const [quizName, setQuizName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [choices, setChoices] = useState("");
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const { classId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const createQuiz = async () => {
    try {
      const response = await axiosPrivate.post(
        `http://localhost:3300/api/quizzes/${classId}/create`,
        {
          quizName,
          questions,
        }
      );
      console.log(response);
      navigate(`/class/${classId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const addQuestion = () => {
    const parsedChoices = choices.split("\n");

    setQuestions([
      ...questions,
      {
        prompt,
        choices: parsedChoices,
        answer,
      },
    ]);
    setPrompt("");
    setChoices("");
    setAnswer("");
  };

  return (
    <main>
      <h1>Quiz Builder</h1>

      <p>
        Quiz Name:{" "}
        <input
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
      </p>

      {questions.map((question, index) => (
        <div>
          <h3>{question.prompt}</h3>
          {question.choices.map((choice) => (
            <div>
              <input type="radio" name={index} />
              <label>{choice}</label>
            </div>
          ))}
        </div>
      ))}

      <label>Prompt: </label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br></br>
      <label>Choices: </label>
      <textarea
        style={{ resize: "none" }}
        rows={4}
        cols={24}
        value={choices}
        onChange={(e) => setChoices(e.target.value)}
      ></textarea>
      <br></br>
      <label>Answer: </label>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={createQuiz}>Create Quiz</button>
    </main>
  );
}
export default QuizBuilder;
