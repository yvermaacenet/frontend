import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { form_flexible_validation } from "../../Utils/Validation_Form";
import { useForm } from "react-hook-form";
import Navbar from "../../Partials/Navbar";
import Sidebar from "../../Partials/Sidebar";
import Page_Header from "../../Partials/Page_Header";
import { useAlert } from "react-alert";
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
const Flexible_Benefit_Plan = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [selectedBand, setselectedBand] = useState("Band 1");
  const [selectedStream, setSelectedStream] = useState("HR");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [inputData, setInputData] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(form_flexible_validation),
  });
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await axios
        .get(`get_form_flexible_by_id/${LocalStorageData?.user_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return (
            console.log("aas", resp.data),
            setInputData({
              ...resp.data[0],
              children_allowance:
                resp.data[0]?.children_allowance !== undefined
                  ? resp.data[0]?.children_allowance / 100
                  : resp.data[0]?.children_allowance,
            }),
            setselectedBand(
              resp.data[0]?.salary_band === undefined
                ? "Band 1"
                : resp.data[0]?.salary_band
            ),
            setSelectedStream(
              resp.data[0]?.stream === undefined ? "HR" : resp.data[0]?.stream
            ),
            setSelectedPosition(
              resp.data[0]?.position === undefined ? "" : resp.data[0]?.position
            ),
            setLoading(false)
          );
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    getData();
  }, []);
  const handleBandChange = (event) => {
    setselectedBand(event.target.value);
    setInputData({
      ...inputData,
      fuel_allowance: "0",
      meals_allowance: "0",
      books_and_periodicals_allowance: "0",
      telephone_allowance: "0",
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
  const onSaveButton = (e) => {
    const jsonDate = {
      ...inputData,
      status: false,
      user_id: LocalStorageData?.user_id,
      email: LocalStorageData?.email,
      emp_id: LocalStorageData?.emp_id,
      name: LocalStorageData?.name,
      salary_band: selectedBand,
      stream: selectedStream,
      position: selectedPosition,
      children_allowance: inputData?.children_allowance * 100,
    };
    async function postData() {
      setLoading(true);
      await axios
        .post(`form_flexilble_benefit/${inputData?._id}`, jsonDate, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return (
            alert.success("Form has been saved"),
            resp?.data?.message === "Form has been submitted successfully" &&
              navigate("/"),
            setLoading(false)
          );
        })
        .catch((err) => err.response.status === 403 && navigate("/"));
    }
    postData();
  };
  const onSubmitButton = (e) => {
    const jsonDate = {
      ...inputData,
      status: true,
      user_id: LocalStorageData?.user_id,
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
      position: selectedPosition === "" ? "0" : selectedPosition,
      telephone_allowance:
        inputData?.telephone_allowance === "" ||
        inputData?.telephone_allowance === undefined
          ? "0"
          : inputData?.telephone_allowance,
      fuel_allowance:
        inputData?.fuel_allowance === "" ||
        inputData?.fuel_allowance === undefined
          ? "0"
          : inputData?.fuel_allowance,
      driver_allowance:
        inputData?.driver_allowance === "" ||
        inputData?.driver_allowance === undefined
          ? "0"
          : inputData?.driver_allowance,
      meals_allowance:
        inputData?.meals_allowance === "" ||
        inputData?.meals_allowance === undefined
          ? "0"
          : inputData?.meals_allowance,
      books_and_periodicals_allowance:
        inputData?.books_and_periodicals_allowance === "" ||
        inputData?.books_and_periodicals_allowance === undefined
          ? "0"
          : inputData?.books_and_periodicals_allowance,
    };
    async function postData() {
      setLoading(true);
      await axios
        .post(`form_flexilble_benefit/${inputData?._id}`, jsonDate, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return (
            alert.success("Form has been submitted"),
            resp?.data?.message === "Form has been submitted successfully" &&
              navigate("/"),
            setLoading(false)
          );
        })
        .catch((err) => err.response.status === 403 && navigate("/"));
    }
    postData();
  };

  const style = {
    display: "inline",
    color: "red",
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <Sidebar />
          <div class="main-panel">
            <div class="content-wrapper">
              <Page_Header
                page_heading="Declaration - Flexible Benefit Plan (See rule 26C)"
                page_title_button=""
                page_title_button_link="/dashboard"
                page_title_icon="mdi-book-plus"
              />
              {loading && (
                <div className="loader-container">
                  <div class="loader"></div>
                </div>
              )}
              <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <form
                        className="forms-sample"
                        onSubmit={handleSubmit(onSubmitButton)}
                      >
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Name</label>

                              <input
                                className="form-control form-control-sm"
                                name="name"
                                placeholder="Enter Name"
                                value={LocalStorageData?.name}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Email</label>
                              <input
                                className="form-control form-control-sm"
                                name="email"
                                placeholder="Enter Email"
                                value={LocalStorageData?.email}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Employee Id</label>

                              <input
                                className="form-control form-control-sm"
                                name="emp_id"
                                placeholder="Enter Employee id"
                                value={LocalStorageData?.emp_id}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Select your salary band</label>

                              <select
                                className="form-control form-control-sm"
                                onChange={handleBandChange}
                                name="salary_band"
                                disabled={inputData?.status && true}
                                value={inputData?.salary_band}
                              >
                                <option value="Band 1">
                                  less than 10 Lakhs
                                </option>
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
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Select your stream:</label>

                              <select
                                className="form-control form-control-sm"
                                id="stream"
                                value={selectedStream}
                                onChange={handleStreamChange}
                                name="stream"
                                disabled={inputData?.status && true}
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
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label>Select your Position:</label>

                              <select
                                name="position"
                                className="form-control form-control-sm"
                                value={selectedPosition}
                                onChange={handlePositionChange}
                                disabled={inputData?.status && true}
                              >
                                <option value="">Select a position</option>
                                {positions[selectedStream].map((position) => (
                                  <option key={position} value={position}>
                                    {position}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        {selectedBand !== "Band 1" && (
                          <>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>
                                    Children allowance <span>(Max. 2)</span>
                                  </label>
                                  <select
                                    className="form-control form-control-sm"
                                    name="children_allowance"
                                    onChange={handleInput}
                                    value={inputData?.children_allowance}
                                    disabled={inputData?.status && true}
                                  >
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                  </select>
                                  <div style={{ fontSize: "12px" }}>
                                    <span className="text-danger mt-2">
                                      * Total Allowance:
                                    </span>
                                    <span className="ms-1 me-1 fw-bold">
                                      {inputData?.children_allowance ===
                                      undefined
                                        ? 0 * 100
                                        : inputData?.children_allowance * 100}
                                    </span>
                                    Per Month
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>
                                    Telephone Allowance{" "}
                                    <span className="text-danger mt-2">
                                      {selectedBand === "Band 2"
                                        ? "(Max 2000) "
                                        : selectedBand === "Band 3"
                                        ? "(Max 3000) "
                                        : selectedBand === "Band 4"
                                        ? "(Max 5000) "
                                        : ""}
                                    </span>
                                  </label>
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
                                    value={inputData?.telephone_allowance}
                                    disabled={inputData?.status && true}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>
                                    Fuel{" "}
                                    <span className="col-4 text-danger mt-2">
                                      {selectedBand === "Band 2"
                                        ? "(Max 3000) "
                                        : selectedBand === "Band 3"
                                        ? "(Max 5000) "
                                        : selectedBand === "Band 4"
                                        ? "(Max 10000) "
                                        : ""}
                                    </span>
                                  </label>

                                  <input
                                    onChange={handleInput}
                                    name="fuel_allowance"
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={inputData?.fuel_allowance}
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
                                    disabled={inputData?.status && true}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>
                                    Meals Allowance{" "}
                                    <span className="col-4 text-danger mt-2">
                                      {selectedBand === "Band 2"
                                        ? "(Max 2000) "
                                        : selectedBand === "Band 3"
                                        ? "(Max 3000) "
                                        : selectedBand === "Band 4"
                                        ? "(Max 5000) "
                                        : ""}
                                    </span>
                                  </label>

                                  <input
                                    onChange={handleInput}
                                    name="meals_allowance"
                                    className="form-control form-control-sm"
                                    value={inputData?.meals_allowance}
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
                                    disabled={inputData?.status && true}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>
                                    Books and Periodicals{" "}
                                    <span className=" text-danger mt-2">
                                      {selectedBand === "Band 2"
                                        ? "(Max 1500)"
                                        : selectedBand === "Band 3"
                                        ? "(Max 2000) "
                                        : selectedBand === "Band 4"
                                        ? "(Max 2500)"
                                        : ""}
                                    </span>
                                  </label>

                                  <input
                                    onChange={handleInput}
                                    name="books_and_periodicals_allowance"
                                    className="form-control form-control-sm"
                                    type="number"
                                    value={
                                      inputData?.books_and_periodicals_allowance
                                    }
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
                                    disabled={inputData?.status && true}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                {selectedBand === "Band 4" && (
                                  <div className="form-group">
                                    <label>
                                      Driver{" "}
                                      <span className="col-4 text-danger mt-2">
                                        {selectedBand === "Band 4"
                                          ? "(Max 8000)"
                                          : ""}
                                      </span>
                                    </label>{" "}
                                    <input
                                      type="number"
                                      name="driver_allowance"
                                      onChange={handleInput}
                                      value={inputData?.driver_allowance}
                                      className="form-control form-control-sm"
                                      max="8000"
                                      min="1"
                                      disabled={inputData?.status && true}
                                      required
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        {/* ===========================Submit================== */}
                        <div className="text-center">
                          {!inputData?.status && (
                            <>
                              <button
                                type="button"
                                className="btn btn-sm btn-gradient-secondary me-2"
                                onClick={onSaveButton}
                              >
                                Save
                              </button>
                              <button
                                type="submit"
                                className="btn btn-sm btn-gradient-success me-2"
                              >
                                Save & Submit
                              </button>
                            </>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flexible_Benefit_Plan;
