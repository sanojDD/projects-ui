// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import DeepfakeDetector from "./projects/DeepfakeDetector";
import MobilePricePredictor from "./projects/MobilePricePredictor";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/deepfake" element={<DeepfakeDetector />} />
          <Route path="/mobile-price" element={<MobilePricePredictor />} />
          <Route
            path="/about"
            element={
              <div className="glass-card">
                <h2>About Me</h2>
                <p>Developer focused on ML and Backend Engineering in Nepal.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
