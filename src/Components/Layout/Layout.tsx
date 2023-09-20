import { ReactNode } from "react";
import Navbar from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children, ...Props }: Props) => {

  const navigate = useNavigate()

  return (
    <div>
      <Navbar navigate={useNavigate()} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
