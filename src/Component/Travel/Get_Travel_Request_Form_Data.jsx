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
              page_title="Travel Request Updates"
              page_title_icon="mdi-home-modern"
              page_title_button="Back"
              page_title_button_link="/travelrequestform"
            />
            <div className="d-flex justify-content-end mb-3">
              <NavLink to="/travelrequestform">
                <button className="btn btn-primary mx-3">Raise Request</button>
              </NavLink>
              <NavLink to="/travelrequestreceived">
                <button className="btn btn-primary">Take Action</button>
              </NavLink>
            </div>
            {loading && (
              <div className="loader-container">
                <div class="loader"></div>
              </div>
            )}
            <div className="row card p-4" style={{ overflow: "auto" }}>
              <div className="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="">
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
                        <tr className="text-center">
                          <th>Id</th>
                          <th>Requested On</th>
                          <th>Manager Approval</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getleaverequestdata?.map((val, index) => {
                          return (
                            <tr className="text-center">
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
                                  View
                                </td>
                                <td
                                  className="btn btn-danger bg-danger text-white btn-sm mx-2"
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
            width={"50%"}
          >
            <div className="p-0 m-0 small">
              <div className="p-0 m-0">
                <div className="row">
                  <h5 className=" fw-bold" style={{ color: "#b66dff" }}>
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
                          {viewRequestData?.travel?.start_date?.split("T")[0]}
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
                        {viewRequestData?.travel?.end_date?.split("T")[0]}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                    <div className="row text-center text-lg-start">
                      <div className="col-12 col-lg-6 fw-bold"> Reason:</div>
                      <div className="col-12 col-lg-6">
                        {" "}
                        {viewRequestData?.travel?.reason_for_travel}
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
                        {viewRequestData?.employee?.project_id}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="row mt-4 text-center text-lg-start">
                      <div className="col-12 col-lg-6 fw-bold"> Billable:</div>
                      <div className="col-12 col-lg-6">
                        {" "}
                        {viewRequestData?.employee?.billable}
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
                        {viewRequestData?.managers_approval}
                      </div>
                    </div>
                  </div>
                </div>
                {viewRequestData?.flight?.flight_from_city ? (
                  <div className="row mt-4 text-center text-lg-start">
                    <p className="fw-bold " style={{ color: "#b66dff" }}>
                      <hr className="m-4" />
                      Flight Info
                    </p>
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold ">
                          {" "}
                          From Location:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {viewRequestData?.flight?.flight_from_city}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="row ">
                        <div className="col-12 col-lg-6 fw-bold ">
                          {" "}
                          To Location::
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {viewRequestData?.flight?.flight_to_city}
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
                          {viewRequestData?.flight?.flight_preferred_time}
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
                          {viewRequestData?.managers_approval}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* Hotel Request */}
                {viewRequestData?.hotel?.hotel_city ? (
                  <div className="row mt-4 text-center text-lg-start">
                    <p className="fw-bold " style={{ color: "#b66dff" }}>
                      <hr className="m-4" />
                      Hotel Info
                    </p>
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold ">
                          {" "}
                          City Name:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {viewRequestData?.hotel?.hotel_city}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="row ">
                        <div className="col-12 col-lg-6 fw-bold ">
                          {" "}
                          Checkin Date:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {
                            (viewRequestData?.hotel?.hotel_checkin).split(
                              "T"
                            )[0]
                          }
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
                          {
                            (viewRequestData?.hotel?.hotel_checkout).split(
                              "T"
                            )[0]
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold"> Rooms:</div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {viewRequestData?.hotel?.hotel_number_of_rooms}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* Other Request */}
                {viewRequestData?.train?.train_from_city ? (
                  <div className="row mt-4 text-center text-lg-start">
                    <p className="fw-bold " style={{ color: "#b66dff" }}>
                      <hr className="m-4" />
                      Other Request Info
                    </p>
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold">
                          {" "}
                          Travel Name:
                        </div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {viewRequestData?.other?.name_of_travel}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 ">
                      <div className="row ">
                        <div className="col-12 col-lg-6 fw-bold"> From:</div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {
                            (viewRequestData?.other?.from_location).split(
                              "T"
                            )[0]
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mt-lg-4 mt-2">
                      <div className="row">
                        <div className="col-12 col-lg-6 fw-bold"> To:</div>
                        <div className="col-12 col-lg-6">
                          {" "}
                          {(viewRequestData?.other?.to_location).split("T")[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
