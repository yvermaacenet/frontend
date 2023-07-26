import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../Partials/Footer";
import Navbar from "../Partials/Navbar";
import Sidebar from "../Partials/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWpforms, FaLuggageCart, FaDoorOpen } from "react-icons/fa";
const Dashboard = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [roless, setRoless] = useState();
  // const [counterList, setCounterList] = useState([]);
  // const [states, setStates] = useState({ activeIndex: 0 });
  const [loading, setLoading] = useState(false);
  const toaster = () => {
    const messageDisplayed = localStorage.getItem("messageDisplayed");
    if (!messageDisplayed) {
      toast.success(`Welcome ${LocalStorageData?.name}!`);
      localStorage.setItem("messageDisplayed", true);
    }
  };

  useEffect(() => {
    // setLoading(true);
    // async function get_counterList() {
    //   await axios
    //     .get(`/documents_counter/${LocalStorageData?.user_id}`, {
    //       headers: { authorization: LocalStorageData?.generate_auth_token },
    //     })
    //     .then((res) => {
    //       return setCounterList(res?.data), setLoading(false);
    //     })
    //     .catch((err) => {
    //       if (err.response.status === 500) {
    //         navigate("/error_500");
    //       } else {
    //         navigate("/error_403");
    //       }
    //     });
    // }
    // toaster();
    // get_counterList();
  }, []);
  toaster();

  const cardArray = [
    // {
    //   card_background: "bg-gradient-success",
    //   path: "/user_list/active_users",
    //   card_title: "Users",
    //   card_icon: "mdi-account-multiple-outline",
    //   card_counter_data: counterList?.Active_Users,
    //   card_allowed_access: ["Admin", "Hr", "Finance", "Management"],
    // },
    // {
    //   card_background: "bg-gradient-primary",
    //   path: "/user_list/pending_onboarding_users",
    //   card_title: "Pending Onboarding",
    //   card_icon: "mdi-view-dashboard",
    //   card_counter_data: counterList?.Pending_Onboarding,
    //   card_allowed_access: ["Admin", "Hr", "Finance", "Management"],
    // },
    // {
    //   card_background: "bg-gradient-secondary",
    //   path: "/user_list/pending_offboarding_users",
    //   card_title: "Pending Offboarding",
    //   card_icon: "mdi-view-dashboard",
    //   card_counter_data: counterList?.Pending_Offboarding,
    //   card_allowed_access: ["Admin", "Hr", "Finance", "Management"],
    // },
    // {
    //   card_background: "bg-gradient-warning",
    //   path: "/cabin_slot_booking",
    //   card_title: "Cabin Booking",
    //   card_icon: "mdi-home-modern",
    //   card_counter_data: counterList?.Total_Cabin_Booking,
    //   card_allowed_access: [
    //     "Admin",
    //     "Hr",
    //     "Finance",
    //     "Management",
    //     "Team member",
    //   ],
    // },
    // {
    //   card_background: "bg-gradient-info",
    //   path: "/form12bb",
    //   card_title: "Form 12 BB",
    //   card_icon: "mdi-book-plus",
    //   card_allowed_access: [
    //     "Admin",
    //     "Hr",
    //     "Finance",
    //     "Management",
    //     "Team member",
    //   ],
    // },
    // {
    //   card_background: "bg-gradient-dark",
    //   path: "/get_form12bb_data",
    //   card_title: "Download Form 12 BB Data",
    //   card_icon: "mdi-book-plus",
    //   card_allowed_access: ["Finance"],
    // },
    // {
    //   card_background: "bg-gradient-danger",
    //   path: "/flexible_benefit_plan",
    //   card_title: "Form Flexible Benefit",
    //   card_icon: "mdi-book-plus",
    //   card_allowed_access: [
    //     "Admin",
    //     "Hr",
    //     "Finance",
    //     "Management",
    //     "Team member",
    //   ],
    // },
    // {
    //   card_background: "bg-gradient-primary",
    //   path: "/get_form_flexi_benefit_data",
    //   card_title: "Download Form Flexible Benefit Data",
    //   card_icon: "mdi-book-plus",
    //   card_allowed_access: ["Finance"],
    // },
    // {
    //   card_background: "bg-gradient-success",
    //   path: "/travelrequestform",
    //   card_title: "Travel Request Form",
    //   card_icon: "mdi-book-plus",
    //   card_allowed_access: [
    //     "Admin",
    //     "Hr",
    //     "Finance",
    //     "Management",
    //     "Team member",
    //   ],
    // },
    // {
    //   card_background: "bg-gradient-info",
    //   path: "/travelrequestreceived",
    //   card_title: "Travel Request Approvals",
    //   card_icon: "mdi-book-plus",
    //   display_none: roless?.Reporting_Manager.includes("60") ? "block" : "none",
    //   card_allowed_access: [
    //     "Admin",
    //     "Hr",
    //     "Finance",
    //     "Management",
    //     "Team member",
    //   ],
    // },
  ];

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper" style={{ borderRadius: "20px" }}>
            {/* <Page_Header
            page_heading="Travel Requests List"
            page_title="Create new request"
            page_title_icon="mdi-wallet-travel"
            page_title_button=""
            page_title_button_link="/travelrequestform"
          /> */}
            {/* <div className="d-flex  justify-content-end mb-3"> */}
            {/* <NavLink to="/travelrequestform">
              <button className="btn btn-sm btn-success mx-3">
                Raise Request
              </button>
            </NavLink> */}
            {/* {isManager && ( */}
            {/* <NavLink to="/travelrequestreceived">
              <button className="btn btn-sm btn-dark">Take Action</button>
            </NavLink> */}
            {/* )} */}
            {/* </div> */}
            {loading && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
            <div className="row h-100">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card" style={{ borderRadius: "20px" }}>
                  <div className="card-body d-flex align-items-center flex-column justify-content-center">
                    <>
                      <div className="row g-4 w-100">
                        <div className="col-12">
                          <div className="w-100">
                            <h3 class="mb-0 fs-1 font-weight-medium text-center">
                              <img
                                src={LocalStorageData?.photo}
                                alt=""
                                srcset=""
                                style={{ borderRadius: "50%" }}
                              />
                              <br />
                              Welcome back,
                              <br /> {LocalStorageData?.name}!
                            </h3>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-flex justify-content-around align-items-center">
                            <div
                              className=" d-flex justify-content-center border"
                              style={{
                                boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
                                borderRadius: "30px",
                                height: "8rem",
                                width: "30%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <FaWpforms
                                className="fs-1 mx-3"
                                style={{ color: "#d14124" }}
                              />
                              <NavLink className="nav-link" to="/form12bb">
                                <h4>Forms</h4>
                              </NavLink>
                            </div>
                            <div
                              className=" d-flex justify-content-center border"
                              style={{
                                boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
                                borderRadius: "30px",
                                height: "8rem",
                                width: "30%",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <FaLuggageCart
                                className="fs-1 mx-3"
                                style={{ color: "#d14124" }}
                              />
                              <NavLink
                                className="nav-link"
                                to="/travelrequestform"
                              >
                                <h4>Travel Request</h4>
                              </NavLink>
                            </div>
                            <div
                              className=" d-flex justify-content-center border"
                              style={{
                                boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
                                borderRadius: "30px",
                                height: "8rem",
                                display: "flex",
                                width: "30%",

                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <FaDoorOpen
                                className="fs-1 mx-3"
                                style={{ color: "#d14124" }}
                              />
                              <NavLink
                                className="nav-link"
                                to="/cabin_slot_booking"
                              >
                                <h4>Cabin Booking</h4>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div>
                   <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </div> */}

                      {/* <div className="row">
                  <div className="col-md-12">
                    <div className="template-demo mt-2">
                      <NavLink
                        to="/form12bb"
                        className="btn btn-outline-dark btn-icon-text"
                      >
                        <i className="mdi mdi-book-plus btn-icon-prepend  "></i>
                        <span className="d-inline-block text-left">
                          <small className="font-weight-light d-block">
                            Available on the
                          </small>
                          Form 12 BB
                        </span>

                       
                      </NavLink>
                      <NavLink
                        to="/flexible_benefit_plan"
                        className="btn btn-outline-dark btn-icon-text"
                      >
                        <i className="mdi mdi-book-plus btn-icon-prepend  "></i>
                        <span className="d-inline-block text-left">
                          <small className="font-weight-light d-block">
                            Get it on the
                          </small>
                          Form Flexible Benifit
                        </span>
                      </NavLink>
                    </div>
                  </div>
                </div> */}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ========View Request Modal=========== */}

          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
