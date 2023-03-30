import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { BaseURL, headersCors } from "../Utils/AxiosApi";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { form_flexible_validation } from "../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
const Flexible_Benefit_Plan = () => {
  const navigate = useNavigate();
  const positions = {
    hr: ["HR Manager", "HR Executive", "HR Assistant"],
    business: [
      "Business Analyst",
      "Management Consultant",
      "Marketing Specialist",
    ],
    technology: ["Software Engineer", "Web Developer", "Data Analyst"],
  };

  const [selectedBand, setselectedBand] = useState("band_1");
  const [selectedStream, setSelectedStream] = useState("hr");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [inputData, setInputData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(form_flexible_validation),
  });
  const handleBandChange = (event) => {
    setselectedBand(event.target.value);
  };

  const handleStreamChange = (event) => {
    setSelectedStream(event.target.value);
    setSelectedPosition("");
  };

  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmitButton = (e) => {
    const jsonDate = {
      ...inputData,
      vpf_apply:
        inputData?.vpf_apply === undefined ? "no" : inputData?.vpf_apply,
      children_allowance:
        inputData?.children_allowance === undefined
          ? 0
          : inputData?.children_allowance,
      salary_band: selectedBand,
      stream: selectedStream,
      position: selectedPosition,
    };
    async function postData() {
      const result = await axios.post(`${BaseURL}/form_flexi`, jsonDate, {
        headers: headersCors,
      });
      console.log(jsonDate);
      const resp = result.data;
      if (resp?.message === "updated") {
        alert("Created");
        setInputData([]);
        navigate("/");
        // window.location.reload();
      }
      console.log(jsonDate);
    }
    postData();
  };

  const style = {
    display: "inline",
    color: "red",
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-9 mx-auto">
              <div className="auth-form-light text-left p-5">
                <h2 className="text-center">
                  Declaration - Flexible Benefit Plan{" "}
                </h2>

                <h6 className="font-weight-light text-center">
                  (See rule 26C)
                </h6>
                <div className="text-end mb-4">
                  <button className="btn btn-success">
                    <NavLink
                      to="/get_flexi_form_data"
                      className="text-light ms-2 text-decoration-none fw-lighter fs-6"
                    >
                      Download Flexi Form Data
                    </NavLink>
                  </button>
                  <button className="btn btn-success ms-3">
                    <NavLink
                      to="/form12bb"
                      className="text-light ms-2 text-decoration-none fw-lighter fs-6"
                    >
                      12BB Form
                    </NavLink>
                  </button>
                </div>

                <form
                  className="forms-sample"
                  onSubmit={handleSubmit(handleSubmitButton)}
                >
                  <div className="form-group">
                    <label for="exampleInputUsername1">Name</label>

                    <input
                      className={classNames("form-control form-control-sm", {
                        "is-invalid": errors.name,
                      })}
                      {...register("name", {
                        value: inputData?.name,
                      })}
                      name="name"
                      onChange={handleInput}
                      placeholder="Enter First name"
                      value={inputData?.name}
                      // autoSave
                    />
                    <small class="invalid-feedback">
                      {errors.name?.message}
                    </small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputUsername1">Email</label>

                    <input
                      className={classNames("form-control form-control-sm", {
                        "is-invalid": errors.email,
                      })}
                      {...register("email", {
                        value: inputData?.email,
                      })}
                      name="email"
                      onChange={handleInput}
                      placeholder="Enter Email"
                      value={inputData?.email}
                      // autoSave
                    />
                    <small class="invalid-feedback">
                      {errors.email?.message}
                    </small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputUsername1">Employee Id</label>

                    <input
                      className={classNames("form-control form-control-sm", {
                        "is-invalid": errors.emp_id,
                      })}
                      {...register("emp_id", {
                        value: inputData?.emp_id,
                      })}
                      name="emp_id"
                      onChange={handleInput}
                      placeholder="Enter Employee id"
                      value={inputData?.emp_id}
                      maxLength={4}
                    />
                    <small class="invalid-feedback">
                      {errors.emp_id?.message}
                    </small>
                  </div>

                  <div className="form-group">
                    <label for="exampleFormControlSelect3">
                      Select your salary band
                    </label>

                    <select
                      className="form-control form-control-sm"
                      id="exampleFormControlSelect3"
                      onChange={handleBandChange}
                      name="salary_band"
                    >
                      <option value="band_1">less than 10 Lakhs</option>
                      <option value="band_2"> 10 lakhs - 15 Lakhs</option>
                      <option value="band_3"> 15 Lakhs - 20 Lakhs</option>
                      <option value="band_4"> Above 20 Lakhs</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlSelect3">
                      Select your stream:
                    </label>

                    <select
                      className="form-control form-control-sm"
                      id="stream"
                      value={selectedStream}
                      onChange={handleStreamChange}
                      name="stream"
                    >
                      <option value="hr">HR</option>
                      <option value="business">Business Consulting</option>
                      <option value="technology">Technology</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlSelect3">
                      Select your Position:
                    </label>

                    <select
                      name="position"
                      className="form-control form-control-sm"
                      value={selectedPosition}
                      onChange={handlePositionChange}
                    >
                      <option value="">Select a position</option>
                      {positions[selectedStream].map((position) => (
                        <option key={position} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Would you like to opt for VPF?</label>
                    <span style={style}> *</span>
                    <select
                      onChange={handleInput}
                      name="vpf_apply"
                      id=""
                      className={classNames("form-control form-control-sm", {
                        "is-invalid": errors.vpf_apply,
                      })}
                      {...register("vpf_apply", {
                        value: inputData?.vpf_apply,
                      })}
                    >
                      <option value=""> -- select one -- </option>
                      <option value="no">NO</option>
                      <option value="yes">YES</option>
                    </select>
                    <small class="invalid-feedback">
                      {errors.vpf_apply?.message}
                    </small>
                  </div>

                  {/* =========Only for band 2 and above============= */}
                  {selectedBand !== "band_1" ? (
                    <>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-4">
                            <label htmlFor="">
                              {" "}
                              Children allowance <span>(Max. 2)</span>
                            </label>
                          </div>
                          <div className="col-4">
                            <select
                              className="form-control form-control-sm"
                              name="children_allowance"
                              onChange={handleInput}
                              value={inputData?.children_allowance}
                            >
                              <option value={0}>0</option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                            </select>
                          </div>
                          <div className="col-4">
                            Total Allowance{" "}
                            <span className="ms-3 fw-bold">
                              {inputData?.children_allowance === undefined
                                ? 0 * 100
                                : inputData?.children_allowance * 100}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-4">
                            <label htmlFor="">Telephone Allowance</label>
                          </div>

                          <div className="col-4">
                            <input
                              onChange={handleInput}
                              name="telephone_allowance"
                              className="form-control form-control-sm"
                              type="number"
                              min="1"
                              max={
                                selectedBand === "band_2"
                                  ? 2000
                                  : selectedBand === "band_3"
                                  ? 3000
                                  : selectedBand === "band_4"
                                  ? 5000
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-6">
                            <label htmlFor="">Fuel</label>

                            <input
                              onChange={handleInput}
                              name="fuel_allowance"
                              value={inputData?.fuel}
                              type="number"
                              className="form-control form-control-sm"
                              max={
                                selectedBand === "band_2"
                                  ? "3000"
                                  : selectedBand === "band_3"
                                  ? "5000"
                                  : selectedBand === "band_4"
                                  ? "10000"
                                  : ""
                              }
                            />
                          </div>
                          {selectedBand === "band_4" ? (
                            <div className="col-6">
                              <label htmlFor="">Driver</label>

                              <input
                                type="number"
                                name="driver_allowance"
                                onChange={handleInput}
                                className="form-control form-control-sm"
                                max="8000"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-4">
                            <label htmlFor="">Meals Allowance</label>
                          </div>

                          <div className="col-4">
                            <input
                              onChange={handleInput}
                              name="meals_allowance"
                              className="form-control form-control-sm"
                              type="number"
                              min="1"
                              max={
                                selectedBand === "band_2"
                                  ? "2000"
                                  : selectedBand === "band_3"
                                  ? "3000"
                                  : selectedBand === "band_4"
                                  ? "5000"
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-4">
                            <label htmlFor="">Books and Periodicals</label>
                          </div>

                          <div className="col-4">
                            <input
                              onChange={handleInput}
                              name="books_and_periodicals_allowance"
                              className="form-control form-control-sm"
                              type="number"
                              min="1"
                              max={
                                selectedBand === "band_2"
                                  ? "1500"
                                  : selectedBand === "band_3"
                                  ? "2000"
                                  : selectedBand === "band_4"
                                  ? "2500"
                                  : ""
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {/* ===========================Submit================== */}

                  <button
                    type="submit"
                    className="btn btn-gradient-primary me-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flexible_Benefit_Plan;
