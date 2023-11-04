import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Category from "./pages/Category/Category";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
