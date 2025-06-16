// src/App.tsx
import { Routes, Route, Link } from "react-router-dom";
import SuplimaxPage from "./pages/Suplimax";
import RealEstatePage from "./pages/RealEstate";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="glass-container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="magic-text">AI Video Generator</span>
          </h1>
          <div className="nav-buttons">
            <Link to="/suplimax" className="nav-btn electric-blue">
              <span>Suplimax</span>
            </Link>
            <Link to="/real-estate" className="nav-btn luxury-gold">
              <span>Real Estate</span>
            </Link>
          </div>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/suplimax" element={<SuplimaxPage />} />
            <Route path="/real-estate" element={<RealEstatePage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
