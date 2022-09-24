import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function CreateClass() {
  const [courseName, setCourseName] = useState("");
  const { user } = useContext(UserContext);

  // This function runs when we submit our form
  const createClass = async () => {
    axios
      // We need to send data to our server endpoint
      .post("http://localhost:8800/class/create", {
        courseName,
        instructor: user._id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <form>
      <h1>Create a class</h1>

      <label>Course Name:</label>
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />

      <button type="button" onClick={createClass}>
        Submit
      </button>
    </form>
  );
}
export default CreateClass;
