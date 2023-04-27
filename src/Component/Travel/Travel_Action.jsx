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
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));

  useEffect(() => {
    const get_travel_request_by_id = async () => {
      const res = await axios.get(`/get_travel_request_by_id/${_id}`);
      setGetData([res.data]);
    };
    get_travel_request_by_id();
  }, []);
  //   ====Handle Remarks
  console.log("status", getData[0]?.management_status);

  const handleRemarksChange = (e) => {
    e.preventDefault();
    setRemarks({ ...remarks, [e.target.name]: e.target.value });
  };
  console.log(LocalStorageData?.zoho_role);
  //   ====handle Approve
  const handleApprove = async (e) => {
    e.preventDefault();
    if (
      LocalStorageData?.zoho_role === "Management" &&
      getData[0].manager_status === "Pending"
    ) {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        manager_status: "Approved",
        management_status: "Approved",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show("Approved Successfully");
        navigate("/travelrequestreceived");
      }
    } else if (LocalStorageData?.zoho_role === "Management") {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        management_status: "Approved",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show("Approved Successfully");
        navigate("/travelrequestreceived");
      }
    } else {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        manager_status: "Approved",
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
    if (LocalStorageData?.zoho_role === "Management") {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        manager_status: "Declined",
        management_status: "Declined",
      });
      if (res.data === "Updated Sucessfully") {
        alert.show("Declined Successfully");
        navigate("/travelrequestreceived");
      }
    } else {
      const res = await axios.put(`/update_travel_request/${_id}`, {
        ...remarks,
        manager_status: "Declined",
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
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body ">
                    {getData?.map((modalData) => {
                      return (
                        <div>
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-bold"> Owner: </p>
                            </div>
                            <div className="col-6">
                              <p> {modalData?.name}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-bold"> Requested on:</p>
                            </div>
                            <div className="col-6">
                              <p> {modalData?.creation_date?.split("T")[0]}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-bold"> Request Type: </p>
                            </div>
                            <div className="col-6">
                              <p> {modalData?.type_of_request}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-bold"> Reason: </p>
                            </div>
                            <div className="col-6">
                              <p> {modalData?.reason_for_travel}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-bold"> From:</p>
                            </div>
                            <div className="col-6">
                              <p> {modalData?.from_location}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-bold"> To:</p>
                            </div>
                            <div className="col-6">
                              <p> {modalData?.destination}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-bold"> Travelling Dates:</p>
                            </div>
                            <div className="col-6">
                              <p>
                                {(modalData?.start_date).split("T")[0]}
                                {" to "} {modalData?.end_date.split("T")[0]}
                              </p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-6">
                              <p className="fw-bold"> Est. Amount(INR):</p>
                            </div>
                            <div className="col-6">
                              <p> {modalData?.estimated_amount}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-bold"> Status:</p>
                            </div>
                            <div className="col-6">
                              <p> {modalData?.status}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="row my-4">
                      <form typeof="submit">
                        <div className="row">
                          <div className="col-12">
                            <label htmlFor="">Remarks</label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              name="remarks"
                              onChange={handleRemarksChange}
                              value={remarks?.remarks}
                            />
                          </div>
                        </div>
                        <div className="row my-2">
                          <div className="col-6">
                            <button
                              onClick={handleApprove}
                              className="btn btn-primary"
                            >
                              {" "}
                              Approve
                            </button>
                          </div>
                          <div className="col-6">
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
