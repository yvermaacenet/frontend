import React, { useState } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { user_sign_in_validation } from "../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";

const Sign_In = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [inputData, setInputData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(user_sign_in_validation),
  });
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const onSignInButton = () => {
    async function postData() {
      const result = await axios.post(`sign_in`, inputData);
      const resp = result.data;
      if (resp?.message === "loggedin successfully.") {
        localStorage.setItem("loggedin", JSON.stringify(resp));
        navigate("/dashboard");
      } else {
        alert(resp?.message);
      }
    }
    postData();
  };
  // if (cookies?.Access_Token) {
  //   return <Navigate to={"/dashboard"} />;
  // }
  // ============Working with ZOHO=========
  const CLIENT_ID = "1000.5T8DM01JDTNRYUPXI0I96CA5WD7YTY";
  // const CLIENT_SECRET = "9a85b7eca3f270d6427e4e72005bb3eb2ee6076d06";
  // const TOKEN_URL = "https://accounts.zoho.in/oauth/v2/token";
  // const SCOPE = "ZohoPeople.profile.ALL,ZohoPeople.forms.ALL";
  const REDIRECT_URL = "http://localhost:3000/dashboard"; // your redirect URL
  // const GRANT_TYPE = "authorization_code";

  const authenticate = async () => {
    const authUrl = `https://accounts.zoho.in/oauth/v2/auth?scope=ZohoPeople.employee.ALL,ZohoPeople.forms.ALL&client_id=${CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${REDIRECT_URL}`;
    const response = await axios.post(authUrl);
    // Redirect the user to the Zoho login page
    console.log(response.request.responseURL);
    // navigate(`${response.request.responseURL}`);
    // if (response.request.responseURL) {
    //   return <Navigate to={response.request.responseURL} />;
    // }
    window.location.href = response.request.responseURL;
  };

  //   // Step 2: Get the access token
  //   const getToken = async (code) => {
  //     const tokenUrl = `${TOKEN_URL}?grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URL}&code=${code}`;

  //   const response = await fetch(tokenUrl, {
  //     method: 'POST',
  //     redirect: 'follow',
  //   });

  //   const { access_token } = await response.json();

  //   console.log("access token")
  //   return access_token;
  // };

  // Step 3: Make an API request
  // const getEmployeeDetails = async (accessToken) => {
  //   const url =
  //     "https://people.zoho.com/people/api/forms/P_EmployeeView/records";
  //   const options = {
  //     headers: {
  //       Authorization: `Zoho-oauthtoken ${accessToken}`,
  //     },
  //   };

  //   const response = await fetch(url, options);
  //   const data = await response.json();
  //   return data;
  // };

  // ============End Working with ZOHO=========
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-6 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                  <img src="../../assets/images/logo.svg" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={handleSubmit(onSignInButton)}>
                  <div className="form-group">
                    <input
                      className={classNames("form-control form-control-sm", {
                        "is-invalid": errors.username,
                      })}
                      {...register("username", {
                        value: inputData?.username,
                      })}
                      name="username"
                      onChange={inputEvent}
                      placeholder="Enter Username"
                      value={inputData?.username}
                      // autoSave
                    />
                    <small class="invalid-feedback">
                      {errors.username?.message}
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      className={classNames("form-control form-control-sm", {
                        "is-invalid": errors.password,
                      })}
                      {...register("password", {
                        value: inputData?.password,
                      })}
                      name="password"
                      onChange={inputEvent}
                      placeholder="Enter Password"
                      value={inputData?.password}
                      // autoSave
                    />
                    <small class="invalid-feedback">
                      {errors.password?.message}
                    </small>
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-gradient-primary btn-sm font-weight-medium"
                      type="submit"
                    >
                      SIGN IN
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />{" "}
                        Keep me signed in
                      </label>
                    </div>
                    <a href="#" className="auth-link text-black">
                      Forgot password?
                    </a>
                  </div>
                  {/* <div className="mb-2">
                    <button
                      type="button"
                      className="btn btn-block btn-facebook auth-form-btn"
                    >
                      <i className="mdi mdi-facebook me-2"></i>Connect using
                      facebook
                    </button>
                  </div> */}
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?
                    <NavLink to="sign_up" className="text-primary ms-2">
                      Create
                    </NavLink>
                  </div>
                </form>
                <button
                  className="btn btn-sm btn-dark ms-2"
                  onClick={async () => {
                    try {
                      const code = await authenticate();
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Login With ZOHO
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- content-wrapper ends --> */}
      </div>
      {/* <!-- page-body-wrapper ends --> */}
    </div>
  );
};

export default Sign_In;
