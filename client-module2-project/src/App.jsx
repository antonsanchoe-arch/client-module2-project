import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import './App.css';

function App() {
  return (
    <Router>
      <navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}


export default App
