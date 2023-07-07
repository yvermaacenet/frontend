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
  const [allData, setAllData] = useState([]);
  const [history, setHistory] = useState([false]);
  const [originalData, setOriginalData] = useState([]);
  const [getButtoncode, setButtoncode] = useState(
    "Pending Approval/Decline Request List"
  );

  // const [historyStatus, setHistoryStatus] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await axios
        .get(`all_travel_request`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          const resp = result?.data;
          setAllData(resp);
          console.log("res", resp);
          // const filtered = resp?.filter(
          //   (x) =>
          //     x?.employee?.reporting_manager?.slice(-2) ===
          //     LocalStorageData?.emp_id
          // );
          setOriginalData(resp);
          // const filteredRequest = filtered?.filter(
          //   (x) => x.managers_approval === "Pending"
          // );
          return setGettravelrequestdata(
            LocalStorageData?.zoho_role === "Management"
              ? resp.filter((x) => x?.created_by !== LocalStorageData?.email)
              : resp
          );
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
      setLoading(false);
    }
    getData();
  }, []);

  const handleActiveClick = (e) => {
    e.preventDefault();
    const filteredRequest = originalData.filter(
      (x) => x.management_approval === "Pending"
    );
    setGettravelrequestdata(
      LocalStorageData?.zoho_role === "Management"
        ? allData.filter(
            (x) =>
              x.management_approval === "Pending" &&
              x?.employee?.email !== LocalStorageData?.email
          )
        : filteredRequest
    );
    setButtoncode("Pending Approval/Decline Request List");
  };
  const handleHistoryClick = (e) => {
    e.preventDefault();
    // const filteredRequest = originalData.filter(
    //   (x) =>
    //     x.managers_approval === "Approved" || x.managers_approval === "Declined"
    // );
    setGettravelrequestdata(
      LocalStorageData?.zoho_role === "Management" &&
        allData.filter(
          (x) =>
            x.management_approval === "Approved" ||
            x.management_approval === "Declined"
        )
    );
    setButtoncode("History");
  };

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_heading="Travel Requests list for Approval"
              page_title_icon="mdi-wallet-travel"
              page_title_button=""
              page_title_button_link="#"
            />
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div className="d-flex justify-content-lg-end my-2 justify-content-center ">
              {/* <button className="btn btn-sm btn-info" onClick={handleAllClick}>
                All
              </button> */}
              <button
                className="btn btn-sm btn-warning mx-2 "
                onClick={handleActiveClick}
              >
                Pending
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={handleHistoryClick}
              >
                History
              </button>
            </div>
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <span class="card-description">{getButtoncode}</span>
                    </div>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Id</th>
                          {/* <th>Name</th> */}
                          <th>Request Id</th>
                          <th>Requested on</th>
                          {/* <th>destination</th> */}
                          {/* <th>amount</th> */}

                          {/* <th>Manager Name</th> */}
                          {/* <th>Action from Manager</th> */}
                          <th>Action from Management</th>
                          <th>Remarks</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* =====All Request====== */}
                        {gettravelrequestdata?.map((val, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{val?.employee?.request_id}</td>
                              <td>{val?.createdAt?.split("T")[0]}</td>
                              {/* <td>{val?.destination}</td> */}
                              {/* <td>{val.estimated_amount}</td> */}
                              {/* <td>{val.type_of_request}</td> */}
                              {/* <td>{val?.employee?.reporting_manager}</td> */}

                              {/* <td>
                                <label
                                  class={`${
                                    val?.managers_approval === "Approved"
                                      ? "text-success fw-bold"
                                      : val?.managers_approval === "Declined"
                                      ? "text-danger fw-bold"
                                      : "text-warning fw-bold"
                                  }`}
                                >
                                  {val?.managers_approval}
                                </label>
                              </td> */}
                              <td>
                                <label
                                  class={`${
                                    val?.management_approval === "Approved"
                                      ? "text-success fw-bold"
                                      : val?.management_approval === "Declined"
                                      ? "text-danger fw-bold"
                                      : "text-warning fw-bold"
                                  }`}
                                >
                                  {val?.management_approval}
                                </label>
                              </td>
                              <td>{val?.remarks}</td>

                              <td>
                                <td
                                  className="btn btn-outline-primary btn-sm"
                                  type="button"
                                  onClick={() => {
                                    return (
                                      setModalData(val),
                                      setId(val._id),
                                      navigate(`/travelactionpage/${val._id}`)
                                    );
                                  }}
                                >
                                  View
                                </td>
                              </td>
                            </tr>
                          );
                        })}

                        {/* =======Pending Request===== */}
                      </tbody>
                    </table>
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

export default TravelApprovalRequest;
