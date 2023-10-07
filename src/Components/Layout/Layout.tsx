import { ReactNode } from "react";
import Navbar from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children, ...Props }: Props) => {
  return (
    <div className="heya">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
