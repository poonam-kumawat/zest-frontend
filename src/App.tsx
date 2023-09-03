import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
