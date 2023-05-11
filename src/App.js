import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Account from "./components/account";
import SignIn from "./components/signIn";

function App() {
  return (
    <div className="App" id="loader">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
