import React, { useState } from "react";
import Navbar from "../../Partials/Navbar";
import Sidebar from "../../Partials/Sidebar";
import Page_Header from "../../Partials/Page_Header";
import { useAlert } from "react-alert";

import axios from "axios";
import { NavLink } from "react-router-dom";
const TravelRequestForm = () => {
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const alert = useAlert();
  let [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: LocalStorageData?.name,
    email: LocalStorageData?.email,
    from_location: "",
    destination: "",
    billable: "",
    start_date: "",
    end_date: "",
    type_of_request: "",
    reason_for_travel: "",
    estimated_amount: "",
    comments: "",
  });

  const {
    name,
    email,
    destination,
    from_location,
    start_date,
    billable,
    end_date,
    type_of_request,
    reason_for_travel,
    estimated_amount,
  } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(`/raise_travel_request`, {
      ...formData,
      status: "pending",
      reporting_manager: LocalStorageData?.reporting_manager,
      manager_status: "Pending",
      management_status: "Pending",
    });
    if (res?.data === "updated") {
      setLoading(false);
      alert.show(res?.data);
      setFormData({
        name: LocalStorageData?.name,
        email: LocalStorageData?.email,
        destination: "",
        start_date: "",
        end_date: "",
        billable: "",
        type_of_request: "",
        reason_for_travel: "",
        estimated_amount: "",
        from_location: "",
      });
    }
  };

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Page_Header
                page_title=" Travel Request Form"
                page_title_icon="mdi-book-plus"
                page_title_button="Back"
                page_title_button_link="/alltravelrequest"
              />
              {/* <div className="d-flex my-3 align-items-center justify-content-center justify-content-lg-end">
                {/* <NavLink to="/alltravelrequest">
                  <button className="btn btn-primary align-center">
                    Your Travel Requests
                  </button>
                </NavLink> 

                <NavLink to="/travelrequestreceived">
                  <button className="btn btn-primary align-center">
                    Received Requests for Approvals
                  </button>
                </NavLink>
              </div> */}
              {loading && (
                <div className="loader-container">
                  <div class="loader"></div>
                </div>
              )}
              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body ">
                      <form onSubmit={handleSubmit}>
                        <div className="row my-2">
                          <div className="col-12 col-lg-4">
                            <div>
                              <label>Name</label>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                name="fullName"
                                value={LocalStorageData?.name}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-4">
                            <div controlId="formEmail">
                              <label>Email address</label>
                              <input
                                className="form-control form-control-sm"
                                type="email"
                                value={LocalStorageData?.email}
                                name="email"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-4">
                            <div controlId="formEmail">
                              <label>Billable</label>
                              <select
                                className="form-control form-control-sm"
                                value={formData?.billable}
                                onChange={handleChange}
                                name="billable"
                              >
                                <option selected>Select</option>
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                              </select>
                            </div>
                          </div>
                          {/* <div className="col-4">
                    </div> */}
                        </div>

                        <div className="row my-2">
                          <div className="col-12 col-lg-4">
                            {" "}
                            <div controlId="formTravelDestination">
                              <label>Type of Request</label>

                              <select
                                className="form-control form-control-sm"
                                name="type_of_request"
                                id=""
                                value={formData?.type_of_request}
                                onChange={handleChange}
                              >
                                <option selected>Select</option>
                                <option value="Flight">Flight</option>
                                <option value="Hotel">Hotel</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-lg-4">
                            <div controlId="formPhoneNumber">
                              <label>Travelling From</label>
                              <input
                                className="form-control form-control-sm"
                                type="tel"
                                placeholder="Enter Phone Number"
                                name="from_location"
                                value={formData?.from_location}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-4">
                            {" "}
                            <div controlId="formTravelDestination">
                              <label>Travel To</label>
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder="Enter Travel Destination"
                                name="destination"
                                value={formData?.destination}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row my-2">
                          <div className="col-12 col-lg-6">
                            {" "}
                            <div controlId="formTravelStartDate">
                              <label>Travel Start Date</label>
                              <input
                                className="form-control form-control-sm"
                                type="date"
                                name="start_date"
                                value={start_date}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div controlId="formTravelEndDate">
                              <label>Travel End Date</label>
                              <input
                                className="form-control form-control-sm"
                                type="date"
                                name="end_date"
                                value={end_date}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row my-2">
                          <div className="col-12 col-lg-6">
                            {" "}
                            <div controlId="formReasonForTravel">
                              <label>Reason for Travel</label>
                              <input
                                className="form-control form-control-sm"
                                as="textarea"
                                placeholder="Enter Reason for Travel"
                                name="reason_for_travel"
                                onChange={handleChange}
                                value={formData?.reason_for_travel}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div controlId="formReasonForTravel">
                              <label>
                                Est. Amount <small>(INR)</small>
                              </label>
                              <input
                                className="form-control form-control-sm"
                                type="number"
                                placeholder="Enter Reason for Travel"
                                name="estimated_amount"
                                value={estimated_amount}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <label htmlFor="">Comments:</label>
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              placeholder="Any Comments"
                              name="comments"
                              value={formData?.comments}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <button
                          variant="primary"
                          type="submit"
                          className="btn btn-sm btn-gradient-success me-2"
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
    </>
  );
};

export default TravelRequestForm;
