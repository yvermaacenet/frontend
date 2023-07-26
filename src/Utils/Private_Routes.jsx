import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Private_Routes = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const role = LocalStorageData?.zoho_role;
  const isAuthorized = allowedRoles?.some((roles) => roles?.includes(role));
  // console.log("isAuthorized", isAuthorized);
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/error_404");
    }
    if (!localStorage.getItem("loggedin")) {
      navigate("/error_403");
    }
  }, [navigate]);
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

// import { useNavigate, Outlet, Navigate, Route } from "react-router-dom";

// import React, { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";

// const Private_Routes = ({ allowedRoles, children }) => {
//   const navigate = useNavigate();
//   const [cookies, setCookie, removeCookie] = useCookies([]);
//   const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
//   const user = [];
//   const role = LocalStorageData?.role.filter((val) => user.push(val.name));
//   const isAuthorized = allowedRoles?.some((role) => user?.includes(role));

//   useEffect(() => {
//     if (!cookies["Access_Token"]) {
//       navigate("/");
//     }
//   }, [cookies, navigate]);

//   if (!isAuthorized) {
//     return removeCookie("Access_Token"), (<Navigate to="/" />);
//   }

//   return children;
// };

// export default Private_Routes;
// // import { Navigate, Outlet } from "react-router-dom";
// // import { useCookies } from "react-cookie";

// // const Private_Routes = () => {
// //   const [cookies, setCookie, removeCookie] = useCookies([]);
// //   return cookies?.Access_Token ? <Outlet /> : <Navigate to="/" />;
// // };

// // export default Private_Routes;
