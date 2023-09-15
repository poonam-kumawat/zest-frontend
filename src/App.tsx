import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Category from "./Components/Category/Category";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <div>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<Category />} />

            <Route path="/details" element={<ProductDetailsPage />} />
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
