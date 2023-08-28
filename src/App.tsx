import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
