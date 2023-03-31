import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { BaseURL, headersCors } from "../Utils/AxiosApi";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { form_flexible_validation } from "../Utils/Validation_Form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import Navbar from "../Partials/Navbar";
import Sidebar from "../Partials/Sidebar";
import Page_Header from "../Partials/Page_Header";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Flexible_Benefit_Plan = () => {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));

  const positions = {
    HR: [
      "Executive -HR & Ops",
      "Sr. Executive-HR & Ops",
      "Lead Executive -HR & Ops",
      "Assistant Manager -HR & Ops",
      "Manager -HR & Ops",
      "Associate Vice President -HR & Ops",
      "Vice President -HR& Ops",
      "Associate Director -HR & Ops",
      "Director -HR & Ops",
      "CXO/Managing Partner",
    ],
    "Business Consulting": [
      "Analyst Consulting",
      "Associate Consultant",
      "Consultant",
      "Senior Consultant",
      "Managing Consultant",
      "Principal Consultant",
      "Senior Principal Consultant",
      "Associate Partner",
      "Partner",
      "CXO/Managing Partner",
    ],
    "Technology Consulting": [
      "Junior Software Engineer",
      "Software Engineer",
      "Senior Software Engineer",
      "Lead-Technology/Associate project Manager-Technology",
      "Manger Technology",
      "Associate Vice-President Technology",
      "Vice-President Technology",
      "Director Technology",
      "CXO/Managing Partner",
    ],
    Management: [
      "Analyst",
      "Associate Vice President-Program Management ",
      "Vice President-Program Management",
      "Associate Director-Program Management",
      "Director-Program Management",
      "CXO/Managing Partner",
      "Associate Project Management /Senior Business Analyst",
      "Project Manager/ Managing Consultant",
      "Business Analyst",
      "Associate BA",
    ],
  };

  const [selectedBand, setselectedBand] = useState("Band 1");
  const [selectedStream, setSelectedStream] = useState("HR");
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
    setInputData({
      ...inputData,
      fuel_allowance: "NA",
      meals_allowance: "NA",
      books_and_periodicals_allowance: "NA",
      telephone_allowance: "NA",
    });
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
  function capitalizeBothStrings(str) {
    const words = str.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  }
  const handleSubmitButton = (e) => {
    const jsonDate = {
      ...inputData,
      email: LocalStorageData?.email,
      emp_id: LocalStorageData?.emp_id,
      name:
        inputData?.name !== undefined && capitalizeBothStrings(inputData?.name),

      children_allowance:
        inputData?.children_allowance === undefined
          ? 0
          : inputData?.children_allowance * 100,
      salary_band: selectedBand,
      stream: selectedStream,
      position: selectedPosition === "" ? "NA" : selectedPosition,
      telephone_allowance:
        inputData?.telephone_allowance === "" ||
        inputData?.telephone_allowance === undefined
          ? "NA"
          : inputData?.telephone_allowance,
      fuel_allowance:
        inputData?.fuel_allowance === "" ||
        inputData?.fuel_allowance === undefined
          ? "NA"
          : inputData?.fuel_allowance,
      driver_allowance:
        inputData?.driver_allowance === "" ||
        inputData?.driver_allowance === undefined
          ? "NA"
          : inputData?.driver_allowance,
      meals_allowance:
        inputData?.meals_allowance === "" ||
        inputData?.meals_allowance === undefined
          ? "NA"
          : inputData?.meals_allowance,
      books_and_periodicals_allowance:
        inputData?.books_and_periodicals_allowance === "" ||
        inputData?.books_and_periodicals_allowance === undefined
          ? "NA"
          : inputData?.books_and_periodicals_allowance,
    };
    async function postData() {
      setLoading(true);
      const result = await axios.post(`${BaseURL}/form_flexi`, jsonDate, {
        headers: headersCors,
      });
      const resp = result.data;
      alert(resp.message);
      if (resp?.message === "Form has been submitted") {
        setLoading(false);

        navigate("/");
      }
    }
    postData();
  };

  const style = {
    display: "inline",
    color: "red",
  };

  return (
    <>
      {loading ? (
        <ClipLoader
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="container-scroller">
          <Navbar />
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <Sidebar />
            <div class="main-panel">
              <div class="content-wrapper">
                <Page_Header
                  page_title="Declaration - Flexible Benefit Plan (See rule 26C)"
                  page_title_button="Overview"
                  page_title_icon="mdi-book-plus"
                />
                <div className="content-wrapper d-flex align-items-center auth">
                  <div className="row flex-grow">
                    <div className="col-lg-12 mx-auto">
                      <div className="auth-form-light text-left p-5">
                        {/* <h2 className="text-center">
                      Declaration - Flexible Benefit Plan 
                    </h2>

                    <h6 className="font-weight-light text-center">
                      (See rule 26C)
                    </h6> */}
                        {/* <div className="text-end mb-4">
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
                </div> */}

                        <form
                          className="forms-sample"
                          onSubmit={handleSubmit(handleSubmitButton)}
                        >
                          <div className="form-group">
                            <label for="exampleInputUsername1">Name</label>
                            <span style={style}> *</span>
                            <input
                              className={classNames(
                                "form-control form-control-sm",
                                {
                                  "is-invalid": errors.name,
                                }
                              )}
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
                              className="form-control form-control-sm bg-light"
                              name="email"
                              onChange={handleInput}
                              placeholder="Enter Email"
                              value={LocalStorageData?.email}
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputUsername1">
                              Employee Id
                            </label>
                            <input
                              className="form-control form-control-sm bg-light"
                              name="emp_id"
                              onChange={handleInput}
                              placeholder="Enter Employee id"
                              value={LocalStorageData?.emp_id}
                              disabled
                            />
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
                              <option value="Band 1">less than 10 Lakhs</option>
                              <option value="Band 2">
                                {" "}
                                10 lakhs - 15 Lakhs
                              </option>
                              <option value="Band 3">
                                {" "}
                                15 Lakhs - 20 Lakhs
                              </option>
                              <option value="Band 4"> Above 20 Lakhs</option>
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
                              <option value="HR">HR</option>
                              <option value="Business Consulting">
                                Business Consulting
                              </option>
                              <option value="Technology Consulting">
                                Technology Consulting
                              </option>
                              <option value="Management">Management</option>
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

                          {/* =========Only for band 2 and above============= */}
                          {selectedBand !== "Band 1" ? (
                            <>
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-4">
                                    <label htmlFor="">
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
                                    Total Allowance:
                                    <span className="ms-3 fw-bold">
                                      {inputData?.children_allowance ===
                                      undefined
                                        ? 0 * 100
                                        : inputData?.children_allowance * 100}
                                    </span>
                                    Per Month
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-4">
                                    <label htmlFor="">
                                      Telephone Allowance
                                    </label>
                                  </div>

                                  <div className="col-4">
                                    <input
                                      onChange={handleInput}
                                      name="telephone_allowance"
                                      type="number"
                                      className="form-control form-control-sm"
                                      min="1"
                                      max={
                                        selectedBand === "Band 2"
                                          ? 2000
                                          : selectedBand === "Band 3"
                                          ? 3000
                                          : selectedBand === "Band 4"
                                          ? 5000
                                          : ""
                                      }
                                      maxLength={4}
                                    />
                                    <small class="invalid-feedback">
                                      {errors.telephone_allowance?.message}
                                    </small>
                                  </div>
                                  <div className="col-4 text-danger mt-2">
                                    {selectedBand === "Band 2"
                                      ? "(Max Allowance 2000) "
                                      : selectedBand === "Band 3"
                                      ? "(Max Allowance 3000) "
                                      : selectedBand === "Band 4"
                                      ? "(Max Allowance 5000) "
                                      : ""}
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <div className="row">
                                  <div className="col-4">
                                    <label htmlFor="">Fuel</label>
                                  </div>
                                  <div className="col-4">
                                    <input
                                      onChange={handleInput}
                                      name="fuel_allowance"
                                      value={inputData?.fuel}
                                      type="number"
                                      className="form-control form-control-sm"
                                      min="1"
                                      max={
                                        selectedBand === "Band 2"
                                          ? "3000"
                                          : selectedBand === "Band 3"
                                          ? "5000"
                                          : selectedBand === "Band 4"
                                          ? "10000"
                                          : ""
                                      }
                                    />
                                  </div>
                                  <div className="col-4 text-danger mt-2">
                                    {selectedBand === "Band 2"
                                      ? "(Max Allowance 3000) "
                                      : selectedBand === "Band 3"
                                      ? "(Max Allowance 5000) "
                                      : selectedBand === "Band 4"
                                      ? "(Max Allowance 10000) "
                                      : ""}
                                  </div>
                                </div>
                              </div>
                              {selectedBand === "Band 4" ? (
                                <div className="form-group">
                                  <div className="row">
                                    <div className="col-4">
                                      <label htmlFor="">Driver</label>
                                    </div>
                                    <div className="col-4">
                                      <input
                                        type="number"
                                        name="driver_allowance"
                                        onChange={handleInput}
                                        className="form-control form-control-sm"
                                        max="8000"
                                      />
                                    </div>
                                    <div className="col-4 text-danger mt-2">
                                      {selectedBand === "Band 4"
                                        ? "(Max Allowance 8000)"
                                        : ""}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

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
                                        selectedBand === "Band 2"
                                          ? "2000"
                                          : selectedBand === "Band 3"
                                          ? "3000"
                                          : selectedBand === "Band 4"
                                          ? "5000"
                                          : ""
                                      }
                                    />
                                  </div>
                                  <div className="col-4 text-danger mt-2">
                                    {selectedBand === "Band 2"
                                      ? "(Max Allowance 2000) "
                                      : selectedBand === "Band 3"
                                      ? "(Max Allowance 3000) "
                                      : selectedBand === "Band 4"
                                      ? "(Max Allowance 5000) "
                                      : ""}
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-4">
                                    <label htmlFor="">
                                      Books and Periodicals
                                    </label>
                                  </div>

                                  <div className="col-4">
                                    <input
                                      onChange={handleInput}
                                      name="books_and_periodicals_allowance"
                                      className="form-control form-control-sm"
                                      type="number"
                                      min="1"
                                      max={
                                        selectedBand === "Band 2"
                                          ? "1500"
                                          : selectedBand === "Band 3"
                                          ? "2000"
                                          : selectedBand === "Band 4"
                                          ? "2500"
                                          : ""
                                      }
                                    />
                                  </div>
                                  <div className="col-4 text-danger mt-2">
                                    {selectedBand === "Band 2"
                                      ? "(Max Allowance 1500)"
                                      : selectedBand === "Band 3"
                                      ? "(Max Allowance 2000) "
                                      : selectedBand === "Band 4"
                                      ? "Max Allowance 2500 "
                                      : ""}
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
          </div>
        </div>
      )}
    </>
  );
};

export default Flexible_Benefit_Plan;
