import React, { useState } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { user_sign_in_validation } from "../../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";

const Forms_Data_Download = () => {
  const navigate = useNavigate();

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-6 mx-auto">
              <div className="auth-form-light text-left p-5">
                <h4>Employee Forms Data Download</h4>

                <div className="mt-3 border bg-light p-3">
                  <ul class="list-arrow fw-bolder">
                    <li>
                      <NavLink
                        to="/get_form12bb_data"
                        className="text-success ms-2 text-decoration-none fw-lighter fs-6"
                      >
                        Download Form 12BB Data
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/get_flexi_form_data"
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

export default Forms_Data_Download;
