import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.js";
import Products from "../pages/Dashboard/Products/Products.js";
import Users from "../pages/Dashboard/Users/Users.js";
import OverView from "../pages/Dashboard/OverView/OverView.js";
import Order from "../pages/Dashboard/Orders/Order.js";
import SignIn from "../pages/SignIn/SignIn.js";
import SignUp from "../pages/SignUp/SignUp.js";
import Shop from "../pages/Shop/Shop.js";
import UserOutlet from "../Outlet/userOutlet.js";
import NotFound from "../pages/NotFound/NotFound.js";
import LayoutWithSidebar from "./LayoutWithSidebar.js";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Cart from "../pages/cart/Cart.js";
import AboutUs from "../components/aboutUs/aboutUs.js";
function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<UserOutlet />}>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/shop" element={<Shop />}></Route> */}
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/singleProduct/:slug" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />}></Route>
      </Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/shop" element={<Shop />}></Route>

      <Route
        path="/products"
        element={
          <LayoutWithSidebar>
            {" "}
            <Products />
          </LayoutWithSidebar>
        }
      ></Route>
      <Route
        path="/products/:productID"
        element={
          <LayoutWithSidebar>
            {" "}
            <SingleProduct />
          </LayoutWithSidebar>
        }
      ></Route>
      <Route
        path="/users"
        element={
          <LayoutWithSidebar>
            {" "}
            <Users />
          </LayoutWithSidebar>
        }
      ></Route>
      <Route
        path="/overview"
        element={
          <LayoutWithSidebar>
            {" "}
            <OverView />
          </LayoutWithSidebar>
        }
      ></Route>
      <Route
        path="/orders"
        element={
          <LayoutWithSidebar>
            {" "}
            <Order />
          </LayoutWithSidebar>
        }
      ></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default AppRoutes;
