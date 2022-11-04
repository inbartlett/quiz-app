import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthProvider";

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
