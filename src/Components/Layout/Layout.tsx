import { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface Props {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  // any props that come into the component
}

const Layout = ({ loading, setLoading, children, ...Props }: Props) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      {!loading && <Footer />}
    </div>
  );
};
export default Layout;
