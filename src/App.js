import "./App.css";
import UniList from "./components/uniList";
import University from "./components/university";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/uni/:year/:name" element={<University />} />
          <Route path="/" element={<UniList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
