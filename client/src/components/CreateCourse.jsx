import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { axiosPrivate } from "../utils/axios";

function CreateCourse({ state: { courses, setCourses } }) {
  const axiosPrivate = useAxiosPrivate();
  const [courseName, setCourseName] = useState("");
  const [students, setStudents] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosPrivate.post("/classes/create", {
        courseName,
        students: students.replace(" ", "").split("\n"),
      });

      setCourses([...courses, response.data.class]);
      setCourseName("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  return (
    <form onSubmit={(e) => createCourse(e)}>
      <h3>Create a Course</h3>
      <label>Course Name: </label>
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <br></br>
      <label>Student Emails: </label>
      <br></br>
      <textarea
        cols="30"
        rows="10"
        value={students}
        onChange={(e) => setStudents(e.target.value)}
      ></textarea>
      <button>Create Course</button>
    </form>
  );
}
export default CreateCourse;
