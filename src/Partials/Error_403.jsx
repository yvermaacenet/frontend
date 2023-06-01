import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
const Error_403 = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  // useEffect(() => {
  //   async function aa() {
  //     return await localStorage.clear(), removeCookie(["Access_Token"]);
  //   }
  //   aa();
  // }, []);
  return (
    <div className="container-scroller" style={{ height: "100vh" }}>
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div
          className="content-wrapper d-flex align-items-center text-center error-page  bg-white"
          // style={{
          //   backgroundImage: "url(" + "../assets/images/303.png" + ")",
          //   backgroundSize: "contain",
          //   backgroundPositionY: "center",
          // }}
        >
          <div className="row flex-grow">
            <div className="col-lg-6 col-12 mx-auto text-white">
              <div className="row align-items-center d-flex text-dark flex-row">
                <div className="col-lg-6 text-lg-right pr-lg-4">
                  <h1 className="display-1 mb-0">403</h1>
                </div>
                <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                  <h2>SORRY!</h2>
                  <h3 className="font-weight-light">Session Expired!</h3>
                </div>
              </div>
              <div className="row mt-5 text-dark  ">
                <div className="col-12 text-center mt-xl-2">
                  Please{" "}
                  <NavLink className="font-weight-medium" to="/">
                    {" "}
                    Login
                  </NavLink>{" "}
                  Again to Continue
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 mt-xl-2">
                  <p className="text-dark font-weight-medium text-center">
                    Copyright &copy; 2023 All rights reserved.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <img
                src="../../assets/images/303.png"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error_403;
