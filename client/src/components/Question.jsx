function Question({ num, prompt, choices }) {
  return (
    <div>
      <h2>{prompt}</h2>
      {choices.map((choice) => (
        <div>
          <input type="radio" name={num} id={choice} />
          <label>{choice}</label>
        </div>
      ))}
    </div>
  );
}
export default Question;
