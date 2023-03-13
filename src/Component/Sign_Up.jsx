import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { user_sign_up_validation } from "../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";

const Sign_Up = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [inputData, setInputData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(user_sign_up_validation),
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
  const onSignUpButton = () => {
    // alert();
    async function postData() {
      const result = await axios.post(`sign_up`, inputData);
      const resp = result.data;
      if (resp?.message === "Registered successfully") {
        alert("Registration has been successfully.");
        navigate("/");
      } else {
        alert(resp?.message);
      }
    }
    postData();
  };
  if (cookies?.Access_Token) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-6 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="brand-logo">
                    <img src="../../assets/images/logo.svg" />
                  </div>
                  <h4>New here?</h4>
                  <h6 className="font-weight-light">
                    Signing up is easy. It only takes a few steps
                  </h6>

                  <form
                    class="forms-sample"
                    onSubmit={handleSubmit(onSignUpButton)}
                  >
                    <div class="form-group">
                      <label for="exampleInputUsername1">First Name</label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.f_name,
                        })}
                        {...register("f_name", {
                          value: inputData?.f_name,
                        })}
                        name="f_name"
                        onChange={inputEvent}
                        placeholder="Enter First name"
                        value={inputData?.f_name}
                        // autoSave
                      />
                      <small class="invalid-feedback">
                        {errors.f_name?.message}
                      </small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">Middle Name</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="exampleInputUsername1"
                        placeholder="Username"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">Last Name</label>
                      <input
                        type="text"
                        class="form-control form-control-sm"
                        id="exampleInputUsername1"
                        placeholder="Username"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.personal_email,
                        })}
                        {...register("personal_email", {
                          value: inputData?.personal_email,
                        })}
                        name="personal_email"
                        onChange={inputEvent}
                        placeholder="Enter personal_email"
                        value={inputData?.personal_email}
                        // autoSave
                      />
                      <small class="invalid-feedback">
                        {errors.personal_email?.message}
                      </small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Phone No</label>
                      <input
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.phone,
                        })}
                        {...register("phone", {
                          value: inputData?.phone,
                        })}
                        name="phone"
                        onChange={inputEvent}
                        placeholder="Enter phone"
                        value={inputData?.phone}
                        // autoSave
                      />
                      <small class="invalid-feedback">
                        {errors.phone?.message}
                      </small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        className={classNames("form-control form-control-sm", {
                          "is-invalid": errors.password,
                        })}
                        {...register("password", {
                          value: inputData?.password,
                        })}
                        name="password"
                        onChange={inputEvent}
                        placeholder="Enter password"
                        value={inputData?.password}
                        // autoSave
                      />
                      <small class="invalid-feedback">
                        {errors.password?.message}
                      </small>
                    </div>

                    <button type="submit" class="btn btn-gradient-primary me-2">
                      Submit
                    </button>
                    <button class="btn btn-light">Cancel</button>
                    <div className="text-center mt-4 font-weight-light">
                      Already have an account?
                      <NavLink to="/" className="text-primary ms-2">
                        Login
                      </NavLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign_Up;
