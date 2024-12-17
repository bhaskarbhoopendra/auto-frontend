import Navbar from "../Components/Nav1/Navbar";
import Banner from "../Components/Banner/Banner";
import Navbar2 from "../Components/Nav2/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Banner />
      <Navbar />
      <Navbar2 />
      <main className="container-layout">{children}</main>
    </div>
  );
};

export default Layout;
