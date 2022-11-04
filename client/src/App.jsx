import { Routes, Route, Link } from "react-router-dom";
import QUIZBACKUP from "./components/QUIZBACKUP";
import QuizBuilder from "./components/QuizBuilder";
import Class from "./pages/Class";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import RequireAuth from "./utils/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class/:classId" element={<Class />} />
        <Route path="/class/:classId/quiz/create" element={<QuizBuilder />} />
        <Route path="/class/:classId/quiz/:quizId" element={<QUIZBACKUP />} />
      </Route>
      <Route path="*" element={"404 Not Found"} />
    </Routes>
  );
}
export default App;
