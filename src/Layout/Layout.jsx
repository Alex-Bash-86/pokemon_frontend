import { Outlet } from "react-router";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";
import { ToastContainer, toast, Bounce, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <div>
        <NavBar />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
          className="mt-[9rem] text-lg"
        />
      </div>
      <main className="my-8 ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
