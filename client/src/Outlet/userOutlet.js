import React from "react";
import NavBar from "../layout/NavBar/NavBar";
import Footer from "../layout/Footer/Footer";
import { Outlet } from "react-router-dom";

function Container() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Container;
