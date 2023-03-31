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
      alert(resp?.message);
    }
    postData();
  };
  // const onSignInZOHO = () => {
  //   async function postData() {
  //     const result = await axios.get(`sign_in_zoho`);
  //     const resp = result.data;
  //     window.location.replace(resp);
  //   }
  //   postData();
  // };
  if (cookies?.Access_Token) {
    return <Navigate to={"/dashboard"} />;
  }
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
                    {/* <button
                      className="btn btn-block btn-gradient-secondary btn-sm font-weight-medium ms-4"
                      type="button"
                      onClick={onSignInZOHO}
                    >
                      ZOHO
                    </button> */}
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
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
                <div className="mt-3 border bg-light p-3">
                  <small>Click here for Forms </small>
                  <ul class="list-arrow fw-bolder">
                    <li>
                      <NavLink
                        to="form12bb"
                        className="text-success ms-2 text-decoration-none fw-lighter fs-6"
                      >
                        Form 12BB
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="get_form12bb_data"
                        className="text-success ms-2 text-decoration-none fw-lighter fs-6"
                      >
                        Download Form 12BB Data
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="flexible_benefit_plan"
                        className="text-success ms-2 text-decoration-none fw-lighter fs-6"
                      >
                        Flexible Benefit Form
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="get_flexi_form_data"
                        className="text-success ms-2 text-decoration-none fw-lighter fs-6"
                      >
                        Download Flexible Benefit Form
                      </NavLink>
                    </li>
                  </ul>
                </div>
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
