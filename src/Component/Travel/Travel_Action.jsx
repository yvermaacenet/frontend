import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Footer from "../../Partials/Footer";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import PureModal from "react-pure-modal";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//travel
const Travel_Action = (props) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [isManager, setIsManager] = useState("");
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));

  const getAllManagersList = async () => {
    const resp = await axios.get("/get_user_list_By_Role_Name");
    const allManagersId = resp.data.Reporting_Manager;
    const filtered = allManagersId.includes(LocalStorageData?.emp_id);
    setIsManager(filtered);
  };
  useEffect(() => {
    const get_travel_request_by_id = async () => {
      const res = await axios.get(`/get_travel_request_by_id/${_id}`, {
        headers: { Access_Token: LocalStorageData?.generate_auth_token },
      });
      setGetData([res.data]);
    };
    get_travel_request_by_id();
    getAllManagersList();
  }, []);
  //   ====Handle Remarks
  // console.log("status", getData[0]?.management_status);
  console.log("isManager", isManager);
  const handleRemarksChange = (e) => {
    e.preventDefault();
    setRemarks({ ...remarks, [e.target.name]: e.target.value });
  };
  //   ====handle Approve
  const handleApprove = async (e) => {
    e.preventDefault();
    if (LocalStorageData?.zoho_role === "Management" && isManager === true) {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        managers_approval: "Approved",
        management_approval: "Approved",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show("Approved Successfully");
        navigate("/travelrequestreceived");
      }
    } else if (LocalStorageData?.zoho_role === "Management") {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        management_approval: "Approved",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show("Approved Successfully");
        navigate("/travelrequestreceived");
      }
    } else {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        managers_approval: "Approved",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show("Approved Successfully");
        navigate("/travelrequestreceived");
      }
    }
  };
  // =====handle Decline
  const handleDecline = async (e) => {
    e.preventDefault();
    if (LocalStorageData?.zoho_role === "Management" && isManager === true) {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        managers_approval: "Declined",
        management_approval: "Declined",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show("Declined Successfully");
        navigate("/travelrequestreceived");
      }
    } else if (LocalStorageData?.zoho_role === "Management") {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        management_approval: "Declined",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show("Declined Successfully");
        navigate("/travelrequestreceived");
      }
    } else {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        managers_approval: "Declined",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show("Declined Successfully");
        navigate("/travelrequestreceived");
      }
    }
  };
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_title="Travel Request Action"
              page_title_icon="mdi-home-modern"
              page_title_button="Back"
              page_title_button_link="/travelrequestreceived"
            />
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}

            <div className="card small">
              <div className="card-body">
                <div className="row">
                  <h5 className=" fw-bold" style={{ color: "#b66dff" }}>
                    {" "}
                    Travel Info
                  </h5>
                  <div className="col-lg-6 col-12 mt-lg-4 ">
                    <div className="row text-center text-lg-start">
                      <div className="col-lg-6 col-12 fw-bold">
                        <small> Start Date:</small>
                      </div>
                      <div className="col-lg-6 col-12 ">
                        <small>
                          {" "}
                          {getData[0]?.travel?.start_date?.split("T")[0]}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 mt-lg-4 mt-2">
                    <div className="row text-center text-lg-start">
                      <div className="col-lg-6 col-12 fw-bold">
                        {" "}
                        <small> End Date:</small>
                      </div>
                      <div className="col-lg-6 col-12">
                        {" "}
                        {getData[0]?.travel?.end_date?.split("T")[0]}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                    <div className="row text-center text-lg-start">
                      <div className="col-12 col-lg-6 fw-bold"> Reason:</div>
                      <div className="col-12 col-lg-6">
                        {" "}
                        {getData[0]?.travel?.reason_for_travel}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="row mt-4 text-center text-lg-start">
                      <div className="col-12 col-lg-6 fw-bold">
                        {" "}
                        Project ID:
                      </div>
                      <div className="col-12 col-lg-6">
                        {" "}
                        {getData[0]?.employee?.project_id}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="row mt-4 text-center text-lg-start">
                      <div className="col-12 col-lg-6 fw-bold"> Billable:</div>
                      <div className="col-12 col-lg-6">
                        {" "}
                        {getData[0]?.employee?.billable}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="row mt-4 text-center text-lg-start">
                      <div className="col-12 col-lg-6 fw-bold">
                        {" "}
                        Request Status:
                      </div>
                      <div className="col-12 col-lg-6">
                        {" "}
                        {getData[0]?.managers_approval}
                      </div>
                    </div>
                  </div>
                </div>
                {getData[0]?.flight?.flight_from_city ? (
                  <div className="row mt-4 text-center text-lg-start">
                    <p className="fw-bold " style={{ color: "#b66dff" }}>
                      <hr className="m-4" />
                      Flight Info
                    </p>
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold mt-lg-4 mt-0">
                          {" "}
                          From Location:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {getData[0]?.flight?.flight_from_city}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="row ">
                        <div className="col-12 col-lg-6 fw-bold mt-lg-4 mt-2">
                          {" "}
                          To Location::
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {getData[0]?.flight?.flight_to_city}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold">
                          {" "}
                          Preferred Time:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {getData[0]?.flight?.flight_preferred_time}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold">
                          {" "}
                          Request Status:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {getData[0]?.managers_approval}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* Hotel Request */}
                {getData[0]?.hotel?.hotel_city ? (
                  <div className="row mt-4 text-center text-lg-start">
                    <p className="fw-bold " style={{ color: "#b66dff" }}>
                      <hr className="m-4" />
                      Hotel Info
                    </p>
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold mt-lg-4 mt-2">
                          {" "}
                          City Name:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {getData[0]?.hotel?.hotel_city}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="row ">
                        <div className="col-12 col-lg-6 fw-bold mt-lg-4 mt-2">
                          {" "}
                          Checkin Date:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {(getData[0]?.hotel?.hotel_checkin).split("T")[0]}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold">
                          {" "}
                          Checkout Date:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {(getData[0]?.hotel?.hotel_checkout).split("T")[0]}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold"> Rooms:</div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {getData[0]?.hotel?.hotel_number_of_rooms}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* Other Request */}
                {getData[0]?.train?.train_from_city ? (
                  <div className="row mt-4 text-center text-lg-start">
                    <p className="fw-bold " style={{ color: "#b66dff" }}>
                      <hr className="m-4" />
                      Other Request Info
                    </p>
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold mt-lg-4 mt-2">
                          {" "}
                          Travel Name:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {getData[0]?.other?.name_of_travel}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                      <div className="row ">
                        <div className="col-12 col-lg-6 fw-bold"> From:</div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {(getData[0]?.other?.from_location).split("T")[0]}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold"> To:</div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {(getData[0]?.other?.to_location).split("T")[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="row m-lg-3 m-2 ">
                <form typeof="submit">
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="">Remarks</label>
                      <input
                        className="form-control "
                        type="text"
                        required
                        name="remarks"
                        onChange={handleRemarksChange}
                        value={remarks?.remarks}
                      />
                    </div>
                  </div>
                  <div className="row my-2 text-center text-lg-start g-2">
                    <div className="col-12 col-lg-4">
                      <button
                        onClick={handleApprove}
                        className="btn btn-primary"
                      >
                        {" "}
                        Approve
                      </button>
                    </div>
                    <div className="col-12 col-lg-4">
                      {" "}
                      <button
                        onClick={handleDecline}
                        className="btn btn-primary"
                      >
                        {" "}
                        Decline
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Travel_Action;
