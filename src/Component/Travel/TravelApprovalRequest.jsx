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

import { useNavigate } from "react-router-dom";
import Travel_Action from "./Travel_Action";
const TravelApprovalRequest = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [id, setId] = useState("");
  const [remarks, setRemarks] = useState([]);
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [gettravelrequestdata, setGettravelrequestdata] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await axios
        .get(`all_travel_request`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          const resp = result.data;
          const filtered = resp.filter(
            (x) => x?.reporting_manager.slice(-2) === LocalStorageData?.emp_id
          );
          console.log("fill", filtered);
          return setGettravelrequestdata(filtered), setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    getData("asd", gettravelrequestdata);
  }, []);
  console.log();
  //   //   ====Handle Remarks

  //   const handleRemarksChange = (e) => {
  //     e.preventDefault();
  //     setRemarks({ ...remarks, [e.target.name]: e.target.value });
  //   };
  //   //   ====handle Approve
  //   const handleApprove = async (e) => {
  //     e.preventDefault();
  //     console.log(e);
  //     const res = await axios.put(`/update_travel_request/${id}`, {
  //       ...remarks,
  //       status: "Approved",
  //     });
  //     if (res.data === "Updated Sucessfully") {
  //       alert.show("Approved Successfully");
  //       setModal(false);
  //     }
  //   };
  //   // =====handle Decline
  //   const handleDecline = async (e) => {
  //     e.preventDefault();
  //     console.log(e);
  //     const res = await axios.put(`/update_travel_request/${id}`, {
  //       ...remarks,
  //       status: "Declined",
  //     });
  //     if (res.data === "Updated Sucessfully") {
  //       alert.show("Declined Successfully");
  //       setModal(false);
  //     }
  //   };
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_title="Requests Received for Approvals"
              page_title_icon="mdi-home-modern"
              page_title_button="Back"
              page_title_button_link="/dashbaord"
            />
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          {/* <th>destination</th> */}
                          {/* <th>amount</th> */}
                          <th>Type</th>
                          <th>Status</th>
                          <th>Requested on</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gettravelrequestdata?.map((val, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{val?.name}</td>
                              {/* <td>{val?.destination}</td> */}
                              {/* <td>{val.estimated_amount}</td> */}
                              <td>{val.type_of_request}</td>
                              <td>{val?.manager_status}</td>
                              <td>{(val?.creation_date).split("T")[0]}</td>

                              <td>
                                <td
                                  className="btn btn-outline-primary btn-sm"
                                  type="button"
                                  onClick={() => {
                                    return (
                                      setModalData(val),
                                      console.log(val),
                                      setId(val._id),
                                      navigate(`/travelactionpage/${val._id}`)
                                    );
                                  }}
                                >
                                  Take Action
                                </td>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <PureModal
            header="Travel Request"
            footer={
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
                    <button onClick={handleApprove} className="btn btn-primary">
                      {" "}
                      Approve
                    </button>
                  </div>
                  <div className="col-6">
                    {" "}
                    <button onClick={handleDecline} className="btn btn-primary">
                      {" "}
                      Decline
                    </button>
                  </div>
                </div>
              </form>
            }
            isOpen={modal}
            closeButton="x"
            width="50%"
            closeButtonPosition="bottom"
            onClose={() => {
              setModal(false);
              return true;
            }}
          >
            <div className="fw-bold">
              <div className="row">
                <div className="col-6">
                  <p> Owner: </p>
                </div>
                <div className="col-6">
                  <p> {modalData?.name}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p> Request Type: </p>
                </div>
                <div className="col-6">
                  <p> {modalData?.type_of_request}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p> Reason: </p>
                </div>
                <div className="col-6">
                  <p> {modalData?.reason_for_travel}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p> From:</p>
                </div>
                <div className="col-6">
                  <p> {modalData?.from_location}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p> To:</p>
                </div>
                <div className="col-6">
                  <p> {modalData?.destination}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p> Requested on:</p>
                </div>
                <div className="col-6">
                  <p> {modalData?.creation_date?.split("T")[0]}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <p> Est. Amount:</p>
                </div>
                <div className="col-6">
                  <p> {modalData?.estimated_amount}</p>
                </div>
              </div>
            </div>
          </PureModal> */}
          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TravelApprovalRequest;
