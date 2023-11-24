import { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ children, ...Props }: Props) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
      
    </div>
  );
};
export default Layout;
