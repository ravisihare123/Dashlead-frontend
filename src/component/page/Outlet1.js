import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Signin from "./Signin";

export default function Outlet1() {
  var frontToken = reactLocalStorage.get("token");

  //  alert(JSON.stringify(frontToken))
  return (
    <>
      {frontToken ? (
        <div>
          {" "}
          <Outlet />
        </div>
      ) : (
        <Navigate to="/signin"/>
      )}
    </>
  );
}
