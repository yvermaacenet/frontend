import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Footer from "../../Partials/Footer";
import PureModal from "react-pure-modal";
import { useAlert } from "react-alert";
import Navbar from "../../Partials/Navbar";
import Page_Header from "../../Partials/Page_Header";
import Sidebar from "../../Partials/Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
const GetTravelRequestForm_Data = () => {
  const alert2 = useAlert();
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [getleaverequestdata, setGetleaverequestdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewRequestModal, setViewRequestModal] = useState(false);
  const [viewRequestData, setViewRequestData] = useState([]);
  const [gettravelrequestdata, setGettravelrequestdata] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);
  const [id, setId] = useState("");
  const [isManager, setIsManager] = useState(false);

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
    async function getAllManagersList() {
      const resp = await axios
        .get("/get_user_list_By_Role_Name")
        .then((result) => {
          const resp = result.data.Reporting_Manager;
          const filtered = resp?.includes(LocalStorageData?.emp_id);
          return setIsManager(filtered);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }

    getAllManagersList();
  }, [renderComponent]);

  // =========Revoke RRequest=========

  // const handleRevokeRequest =
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Page_Header
              page_heading="Travel Requests List"
              page_title="Create new request"
              page_title_icon="mdi-home-modern"
              page_title_button="Add"
              page_title_button_link="/travelrequestform"
            />
            <div className="d-flex justify-content-end mb-3">
              {/* <NavLink to="/travelrequestform">
                <button className="btn btn-sm btn-success mx-3">
                  Raise Request
                </button>
              </NavLink> */}
              {isManager && (
                <NavLink to="/travelrequestreceived">
                  <button className="btn btn-sm btn-dark">Take Action</button>
                </NavLink>
              )}
            </div>
            {loading && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Sr.no</th>
                          <th>Requested On</th>
                          {/* <th>Reason for travel</th> */}
                          <th>Manager Approval</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getleaverequestdata?.map((val, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{val?.createdAt?.split("T")[0]}</td>
                              {/* <td>{val?.travel?.reason_for_travel}</td> */}
                              <td>
                                <label
                                  class={`${
                                    val?.managers_approval === "Approved"
                                      ? "badge badge-success"
                                      : val?.managers_approval === "Declined"
                                      ? "badge badge-danger"
                                      : "badge badge-warning"
                                  }`}
                                >
                                  {val?.managers_approval}
                                </label>
                              </td>

                              <td>
                                <td
                                  className="btn btn-outline-primary btn-sm"
                                  type="button"
                                  // onClick={() => {
                                  //   return (
                                  //     setViewRequestModal(true),
                                  //     setViewRequestData(val)
                                  //   );
                                  // }}
                                  onClick={() => {
                                    return (
                                      // setModalData(val),
                                      setId(val._id),
                                      navigate(`/travelactionpage/${val._id}`)
                                    );
                                  }}
                                >
                                  View
                                </td>
                                <td
                                  className="btn btn-sm btn-outline-danger mx-2"
                                  style={{
                                    visibility:
                                      val?.managers_approval === "Pending"
                                        ? ""
                                        : "hidden",
                                  }}
                                  type="button"
                                  onClick={async () => {
                                    let res = window.confirm(
                                      "Do You Want To Revoke This Request"
                                    );
                                    if (res === true) {
                                      const res2 = await axios.delete(
                                        `/revoke_travel_request/${val?._id}`,
                                        {
                                          headers: {
                                            Access_Token:
                                              LocalStorageData?.generate_auth_token,
                                          },
                                        }
                                      );
                                      if (res2.data === "Deleted Sucessfully") {
                                        setRenderComponent(!renderComponent);
                                        alert2.success("Deleted Successfully");
                                      } else {
                                        alert2.error("something went wrong");
                                      }
                                    }
                                  }}
                                >
                                  Revoke
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
            width={"70%"}
          >
            <div className="row">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h6
                      className="card-title text-primary mt-2"
                      style={{ fontSize: "14px" }}
                    >
                      Information
                    </h6>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Travel Start Date</th>
                          <th>Travel End Date</th>
                          <th>Project Id</th>
                          <th>Billable</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{LocalStorageData?.name}</td>
                          <td>{LocalStorageData?.email}</td>
                          <td>{LocalStorageData?.phone}</td>
                          <td>
                            {viewRequestData?.travel?.start_date?.split("T")[0]}
                          </td>
                          <td>
                            {viewRequestData?.travel?.end_date?.split("T")[0]}
                          </td>
                          <td>{viewRequestData?.employee?.project_id}</td>
                          <td>{viewRequestData?.employee?.billable}</td>
                        </tr>
                        <tr>
                          <th>Reason for Travel</th>
                          <td colSpan={6}>
                            {viewRequestData?.travel?.reason_for_travel}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <>
                      <h6
                        className="card-title text-primary mt-2"
                        style={{ fontSize: "14px" }}
                      >
                        Travel Type
                      </h6>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="w-25">Flight</th>
                            <th className="w-25">Hotel</th>
                            <th className="w-25">Train</th>
                            <th className="w-25">Other</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <label className="form-check-label">
                                <input
                                  name="other_travel"
                                  type="checkbox"
                                  checked={
                                    viewRequestData?.flight?.flight_travel
                                  }
                                  disabled
                                />
                                <i className="input-helper"></i>
                              </label>
                            </td>
                            <td>
                              <label className="form-check-label">
                                <input
                                  name="other_travel"
                                  type="checkbox"
                                  checked={viewRequestData?.hotel?.hotel_travel}
                                  disabled
                                />
                                <i className="input-helper"></i>
                              </label>
                            </td>
                            <td>
                              <label className="form-check-label">
                                <input
                                  name="other_travel"
                                  type="checkbox"
                                  checked={viewRequestData?.train?.train_travel}
                                  disabled
                                />
                                <i className="input-helper"></i>
                              </label>
                            </td>
                            <td>
                              <label className="form-check-label">
                                <input
                                  name="other_travel"
                                  type="checkbox"
                                  checked={viewRequestData?.other?.other_travel}
                                  disabled
                                />
                                <i className="input-helper"></i>
                              </label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                    {viewRequestData?.flight?.flight_travel && (
                      <>
                        <h6
                          className="card-title text-primary mt-2"
                          style={{ fontSize: "14px" }}
                        >
                          Flight Info
                        </h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="w-25">Form City</th>
                              <th className="w-25">To City</th>
                              <th className="w-25">Preferred Time</th>
                              <th className="w-25">Class of Travel</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {viewRequestData?.flight?.flight_from_city}
                              </td>
                              <td>{viewRequestData?.flight?.flight_to_city}</td>
                              <td>
                                {viewRequestData?.flight?.flight_preferred_time}
                              </td>
                              <td>
                                {
                                  viewRequestData?.flight
                                    ?.flight_class_preferred
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                    {viewRequestData?.hotel?.hotel_travel && (
                      <>
                        <h6
                          className="card-title text-primary mt-2"
                          style={{ fontSize: "14px" }}
                        >
                          Hotel Info
                        </h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="w-25">City</th>
                              <th className="w-25">Check-in</th>
                              <th className="w-25">Check-out</th>
                              <th className="w-25">No. of Rooms</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{viewRequestData?.hotel?.hotel_city}</td>
                              <td>
                                {
                                  viewRequestData?.hotel?.hotel_checkin?.split(
                                    "T"
                                  )[0]
                                }
                              </td>
                              <td>
                                {
                                  viewRequestData?.hotel?.hotel_checkout?.split(
                                    "T"
                                  )[0]
                                }
                              </td>
                              <td>
                                {viewRequestData?.hotel?.hotel_number_of_rooms}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}

                    {viewRequestData?.train?.train_travel && (
                      <>
                        <h6
                          className="card-title text-primary mt-2"
                          style={{ fontSize: "14px" }}
                        >
                          Train Info
                        </h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="w-25">Form City</th>
                              <th className="w-25">To City</th>
                              <th className="w-25">Preferred Time</th>
                              <th className="w-25">Class of Travel</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{viewRequestData?.train?.train_from_city}</td>
                              <td>{viewRequestData?.train?.train_to_city}</td>
                              <td>
                                {viewRequestData?.train?.train_preferred_time}
                              </td>
                              <td>
                                {viewRequestData?.train?.train_class_preferred}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}

                    {viewRequestData?.other?.other_travel && (
                      <>
                        <h6
                          className="card-title text-primary mt-2"
                          style={{ fontSize: "14px" }}
                        >
                          Other Info
                        </h6>
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="w-25">Type</th>
                              <th className="w-25">Form City</th>
                              <th>To City</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {viewRequestData?.other?.other_travel_type}
                              </td>
                              <td>{viewRequestData?.other?.other_from_city}</td>
                              <td>{viewRequestData?.other?.other_to_city}</td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
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
