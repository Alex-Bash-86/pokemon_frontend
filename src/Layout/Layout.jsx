import { Outlet } from "react-router";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="my-8 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
