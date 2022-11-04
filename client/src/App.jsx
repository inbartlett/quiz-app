import { Routes, Route, Link } from "react-router-dom";
import Quiz from "./components/Quiz";
import QUIZBACKUP from "./components/QUIZBACKUP";
import Login from "./Login";
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
      </Route>
      <Route path="/quiz" element={<QUIZBACKUP />} />
      <Route path="*" element={"404 Not Found"} />
    </Routes>
  );
}
export default App;
