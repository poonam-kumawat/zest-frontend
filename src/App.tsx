import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Category from "./pages/Category/Category";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import MobileProfile from "./Components/MobileProfile/MobileProfile";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Router>
        <Layout loading={loading} setLoading={setLoading}>
          <Routes>
            <Route
              path="/"
              element={<HomePage loading={loading} setLoading={setLoading} />}
            />
            <Route
              path="/category"
              element={<Category loading={loading} setLoading={setLoading} />}
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetailsPage loading={loading} setLoading={setLoading} />
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout loading={loading} setLoading={setLoading} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/mobile" element={<MobileProfile />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
