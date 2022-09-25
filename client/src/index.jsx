import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
