import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserContext } from "./contexts/UserContext";
import Class from "./pages/Class";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Navbar />
        {/* React Router allows us to render different components based on the current URL */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* You can also pass in dynamic parameters by using : */}
          <Route path="/class/:classId" element={<Class />} />
          <Route path="/class/:classId/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}
export default App;
