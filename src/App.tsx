import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Category from "./pages/Category/Category";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import SignIn from "./Components/SignIn/signIn";

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/login" element={<SignIn/>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
