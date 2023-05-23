import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Footer from "../../Partials/Footer";
import PureModal from "react-pure-modal";

import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
const GetTravelRequestForm_Data = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getleaverequestdata, setGetleaverequestdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewRequestModal, setViewRequestModal] = useState(false);
  const [viewRequestData, setViewRequestData] = useState([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await axios
        .get(`get_travel_request_by_email_id/${LocalStorageData?.email}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          const resp = result.data;

          return setGetleaverequestdata(resp), setLoading(false);
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

  console.log("data", viewRequestData);
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_title="Travel Request Updates"
              page_title_icon="mdi-home-modern"
              page_title_button="Back"
              page_title_button_link="/dashboard"
            />
            <div className="d-flex justify-content-end mb-3">
              <NavLink to="/travelrequestform">
                <button className="btn btn-primary">Raise Request</button>
              </NavLink>
            </div>
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    {/* <h4 class="card-title">Flexible Benefit Plan Form Data</h4> */}

                    {/* <button
                      className="btn btn-outline-primary btn-sm"
                      type="button"
                      //   onClick={() => clickbuttonalldata()}
                      style={{ float: "right" }}
                    >
                      Download All Data
                    </button> */}
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Requested On</th>
                          <th>Manager Approval</th>
                          <th>View Request</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getleaverequestdata?.map((val, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{(val?.createdAt).split("T")[0]}</td>
                              <td>
                                <td className="" type="button" disabled>
                                  {val?.managers_approval}
                                </td>
                              </td>

                              <td>
                                {" "}
                                <td
                                  className="btn btn-outline-primary btn-sm"
                                  type="button"
                                  onClick={() => {
                                    return (
                                      setViewRequestModal(true),
                                      setViewRequestData(val)
                                    );
                                  }}
                                >
                                  View Request
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
          {/* ========View Request Modal=========== */}
          <PureModal
            header="Travel Request"
            isOpen={viewRequestModal}
            onClose={() => {
              setViewRequestModal(false);
              // setAllDay(false);
              return true;
            }}
            width={"80%"}
          >
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h5 className="fs-4 fw-bold"> Travel Info</h5>
                  <div className="col-lg-6">
                    <div className="row text-center text-lg-start">
                      <div className="col-lg-6 col-12 ">Start Data:</div>
                      <div className="col-lg-6 col-12 ">
                        {viewRequestData?.travel?.start_date?.split("T")[0]}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 ">
                    <div className="row text-center text-lg-start">
                      <div className="col-lg-6 col-12 ">End Data:</div>
                      <div className="col-lg-6 col-12 ">
                        {" "}
                        {viewRequestData?.travel?.end_date?.split("T")[0]}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="row">
                      <div className="col-12 col-lg-6"> Reason For Travel</div>
                      <div className="col-12 col-lg-6">
                        {" "}
                        {viewRequestData?.travel?.reason_for_travel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PureModal>

          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default GetTravelRequestForm_Data;
