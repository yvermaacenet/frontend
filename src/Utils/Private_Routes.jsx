import { useNavigate, Outlet, Navigate, Route } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Private_Routes = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const user = [];
  const role = LocalStorageData?.role.filter((val) => user.push(val.name));
  const isAuthorized = allowedRoles?.some((role) => user?.includes(role));

  useEffect(() => {
    if (!cookies["Access_Token"]) {
      navigate("/");
    }
  }, [cookies, navigate]);

  if (!isAuthorized) {
    removeCookie("Access_Token");
    return <Navigate to="/" />;
  }

  return children;
};

export default Private_Routes;
// import { Navigate, Outlet } from "react-router-dom";
// import { useCookies } from "react-cookie";

// const Private_Routes = () => {
//   const [cookies, setCookie, removeCookie] = useCookies([]);
//   return cookies?.Access_Token ? <Outlet /> : <Navigate to="/" />;
// };

// export default Private_Routes;
