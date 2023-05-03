import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Sign_In = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [loading, setLoading] = useState(false);

  const onSignInZoho = () => {
    async function postData() {
      setLoading(true);

      await axios
        .get(`sign_in_zoho`)
        .then((result) => {
          const resp = result.data;
          return window.location.replace(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    postData();
  };
  useEffect(() => {
    async function sendCode() {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        await axios
          .post(`sign_in_zoho_get_access_token/${code}`)
          .then((result) => {
            return (
              localStorage.setItem("loggedin", JSON.stringify(result.data)),
              navigate("/dashboard")
            );
          })
          .catch((err) => console.log(err));
      }
      setLoading(false);
    }
    sendCode();
  }, []);

  if (localStorage.getItem("loggedin")) {
    return <Navigate to={"/dashboard"} />;
  }
  const myStyles = {
    backgroundImage: `url("../assets/login_bg.png")`,
    width: "100%",
    backgroundPosition: "right",
    height: "100%",
    backgroundSize: "cover",
    zIndex: 9999,
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundAttachment: "fixed",
    transition: "background-color 0.5s ease",
  };
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div
            className="content-wrapper d-flex align-items-center auth"
            style={myStyles}
          >
            <div className="row flex-grow text-center">
              <div className="col-lg-4 mx-auto">
                <div
                  className="auth-form-light text-left p-5"
                  style={{ borderRadius: "20px", transparent: "0.5" }}
                >
                  {loading && (
                    <div className="loader-container">
                      <div class="loader"></div>
                    </div>
                  )}
                  <div className="brand-logo mb-0">
                    <img src="../../assets/images/logo.png" />
                  </div>
                  <div>
                    <h4>Hello! let's get started</h4>
                    <img
                      src="assets/images/zoho.svg"
                      style={{ width: "8rem" }}
                    />
                    <button
                      className="btn btn-sm btn-grad w-100 mt-4"
                      onClick={onSignInZoho}
                    >
                      SIGN IN WITH ZOHO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- content-wrapper ends --> */}
        </div>
        {/* <!-- page-body-wrapper ends --> */}
      </div>
    </>
  );
};

export default Sign_In;
