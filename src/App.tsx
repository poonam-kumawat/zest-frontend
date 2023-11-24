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

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
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
