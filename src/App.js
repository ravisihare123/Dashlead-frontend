import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Header from "./component/Header";
import Sidenav from "./component/Sidenav";

import SignUp from "./component/page/SignUp";
import Signin from "./component/page/Signin";
import Home from "./component/page/Home";
import Outlet1 from "./component/page/Outlet1";
import Category from "./component/page/Category";
import Showcategory from "./component/page/Showcategory";
import Product from "./component/page/Product";
import Showproduct from "./component/page/Showproduct";
import Hsn from "./component/page/Hsn";
import Showhsn from "./component/page/Showhsn";
import Customer from "./component/page/Customer"; 
import Showcustomer from "./component/page/Showcustomer";
import Sales from "./component/page/Sales";
import Salesbill from "./component/page/Salesbill";




function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<SignUp />} path="/signup" />
          <Route element={<Signin />} path="/signin" />
          <Route element={<Outlet1 />} path="/">
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Header />} path="header" />
            <Route element={<Sidenav />} path="sidenav" />
            <Route element={<Home />} path="home" />
            <Route element={<Category />} path="category" />
            <Route element={<Showcategory />} path="showcategory" />
            <Route element={<Showproduct />} path="showproduct" />
            <Route element={<Product />} path="product" />
            <Route element={<Hsn />} path="hsn" />
            <Route element={<Showhsn />} path="showhsn" />
            <Route element={<Customer />} path="customer" />
            <Route element={<Showcustomer />} path="showcustomer" />
            <Route element={<Sales />} path="sales" />
            <Route element={<Salesbill />} path="salesbill" />




          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
