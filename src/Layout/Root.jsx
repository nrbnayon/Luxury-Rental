import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
const Root = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setPageTitle("Luxury Rentals - HOME");
    } else if (
      location.state === "/userprofile" ||
      location.state === "/updateprofile" ||
      location.state === "/contact"
    ) {
      setPageTitle("Luxury Rentals - Login");
    } else if (location.state) {
      setPageTitle(location.state);
    } else {
      setPageTitle(`Luxury Rentals - ${location.pathname.replace("/", "")}`);
    }
  }, [location]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  return (
    <div>
      <div className="container mx-auto overflow-x-hidden">
        <div className="h-16">
          <NavBar />
        </div>
        <div className="min-h-[calc(100vh-50px)] mt-2">
          <Outlet />
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Root;
