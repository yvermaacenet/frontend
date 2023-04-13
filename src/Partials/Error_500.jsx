import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Error_500 = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  console.log("cookies", cookies);
  useEffect(() => {
    async function aa() {
      return await localStorage.clear(), removeCookie(["Access_Token"]);
    }
    aa();
  }, []);
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center text-center error-page bg-info">
          <div className="row flex-grow">
            <div className="col-lg-7 mx-auto text-white">
              <div className="row align-items-center d-flex flex-row">
                <div className="col-lg-6 text-lg-right pr-lg-4">
                  <h1 className="display-1 mb-0">500</h1>
                </div>
                <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                  <h2>SORRY!</h2>
                  <h3 className="font-weight-light">Internal server error!</h3>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 text-center mt-xl-2">
                  <NavLink className="text-white font-weight-medium" to="/">
                    Back to home
                  </NavLink>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 mt-xl-2">
                  <p className="text-white font-weight-medium text-center">
                    Copyright &copy; 2023 All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error_500;
