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
  const [active, setActive] = useState([]);
  const [history, setHistory] = useState([false]);
  const [originalData, setOriginalData] = useState([]);

  // const [historyStatus, setHistoryStatus] = useState(false);
  useEffect(() => {
    async function getData() {
      // setLoading(true);
      await axios
        .get(`all_travel_request`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((result) => {
          const resp = result.data;

          // setManagementView(resp);
          const filtered = resp.filter(
            (x) => x?.reporting_manager.slice(-2) === LocalStorageData?.emp_id
          );
          console.log("fill", filtered);
          setOriginalData(filtered);

          return setGettravelrequestdata(filtered);
          // , setLoading(false);
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

  const handleActiveClick = (e) => {
    e.preventDefault();
    const filteredRequest = originalData.filter(
      (x) => x.managers_approval === "Pending"
    );
    setGettravelrequestdata(filteredRequest);
  };
  const handleHistoryClick = (e) => {
    e.preventDefault();
    const filteredRequest = originalData.filter(
      (x) =>
        x.managers_approval === "Approved" || x.managers_approval === "Declined"
    );
    console.log("hi:", filteredRequest);
    setGettravelrequestdata(filteredRequest);
  };
  const handleAllClick = (e) => {
    e.preventDefault();

    setGettravelrequestdata(originalData);
  };
  // ==========Show only data to management that is approved by Managers============
  // if (LocalStorageData?.zoho_role === "Management") {
  //   const filteredDataForManagement = resp.filter(
  //     (x) => x.managers_approval === "Approved"
  //   );

  //   setGettravelrequestdata(filteredDataForManagement);
  // }

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
              page_title_button_link="/alltravelrequest"
            />
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div className="d-flex justify-content-lg-end my-2 justify-content-center ">
              <button className="btn btn-info" onClick={handleAllClick}>
                {" "}
                All
              </button>
              <button
                className="btn btn-danger mx-2 "
                onClick={handleActiveClick}
              >
                {" "}
                Active
              </button>
              <button className="btn btn-success" onClick={handleHistoryClick}>
                {" "}
                History
              </button>
            </div>
            <div class="row card" style={{ overflow: "auto" }}>
              <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Requested on</th>
                          {/* <th>destination</th> */}
                          {/* <th>amount</th> */}
                          <th>Status</th>
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
                              <td>{val?.employee?.name}</td>
                              <td>{val?.createdAt?.split("T")[0]}</td>
                              {/* <td>{val?.destination}</td> */}
                              {/* <td>{val.estimated_amount}</td> */}
                              {/* <td>{val.type_of_request}</td> */}
                              <td>{val?.managers_approval}</td>
                              <td>{val?.remarks}</td>

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
