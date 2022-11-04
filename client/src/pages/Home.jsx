import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Home() {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <main>
      <h1>Quiz App</h1>
      {hasAccount ? (
        <Login setHasAccount={setHasAccount} />
      ) : (
        <Register setHasAccount={setHasAccount} />
      )}
      <small>
        Created By: Isaiah Bartlett, Kirk Carron, Lukas Smith, Zachary Duncan &
        Mason Dunn
      </small>
    </main>
  );
}
export default Home;
