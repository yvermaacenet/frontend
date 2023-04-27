import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../Partials/Footer";
import Navbar from "../Partials/Navbar";
import Page_Header from "../Partials/Page_Header";
import Sidebar from "../Partials/Sidebar";
import { PieChart, Pie, Sector } from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));
  const [state, setState] = useState(LocalStorageData);
  const [clr, setClr] = useState("#1bcfb4");
  const [roless, setRoless] = useState();
  const [counterList, setCounterList] = useState([]);
  const [states, setStates] = useState({ activeIndex: 0 });
  const [loading, setLoading] = useState(false);
  const toaster = () => {
    const messageDisplayed = localStorage.getItem("messageDisplayed");
    if (!messageDisplayed) {
      toast.success(`Welcome ${LocalStorageData?.name}!`);
      localStorage.setItem("messageDisplayed", true);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function get_counterList() {
      await axios
        .get(`/documents_counter/${LocalStorageData?.user_id}`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((res) => {
          return setCounterList(res?.data), setLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    async function get_user_list_by_role_name() {
      const result = await axios
        .get(`/get_user_list_by_role_name`, {
          headers: { Access_Token: LocalStorageData?.generate_auth_token },
        })
        .then((resp) => {
          return setRoless(resp.data);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            navigate("/error_500");
          } else {
            navigate("/error_403");
          }
        });
    }
    get_user_list_by_role_name();
    toaster();
    get_counterList();
  }, []);
  console.log("roless?.Reporting_Manager", roless?.Reporting_Manager);
  const cardArray = [
    {
      card_background: "bg-gradient-success",
      path: "/user_list/active_users",
      card_title: "Users",
      card_icon: "mdi-account-multiple-outline",
      card_counter_data: counterList?.Active_Users,
      card_allowed_access: ["Admin", "Hr", "Finance", "Management"],
    },
    {
      card_background: "bg-gradient-primary",
      path: "/user_list/pending_onboarding_users",
      card_title: "Pending Onboarding",
      card_icon: "mdi-view-dashboard",
      card_counter_data: counterList?.Pending_Onboarding,
      card_allowed_access: ["Admin", "Hr", "Finance", "Management"],
    },
    {
      card_background: "bg-gradient-secondary",
      path: "/user_list/pending_offboarding_users",
      card_title: "Pending Offboarding",
      card_icon: "mdi-view-dashboard",
      card_counter_data: counterList?.Pending_Offboarding,
      card_allowed_access: ["Admin", "Hr", "Finance", "Management"],
    },
    {
      card_background: "bg-gradient-warning",
      path: "/cabin_slot_booking",
      card_title: "Cabin Booking",
      card_icon: "mdi-home-modern",
      card_counter_data: counterList?.Total_Cabin_Booking,
      card_allowed_access: [
        "Admin",
        "Hr",
        "Finance",
        "Management",
        "Team member",
      ],
    },
    {
      card_background: "bg-gradient-info",
      path: "/form12bb",
      card_title: "Form 12 BB",
      card_icon: "mdi-book-plus",
      card_allowed_access: [
        "Admin",
        "Hr",
        "Finance",
        "Management",
        "Team member",
      ],
    },
    {
      card_background: "bg-gradient-dark",
      path: "/get_form12bb_data",
      card_title: "Download Form 12 BB Data",
      card_icon: "mdi-book-plus",
      card_allowed_access: ["Finance"],
    },
    {
      card_background: "bg-gradient-danger",
      path: "/flexible_benefit_plan",
      card_title: "Form Flexible Benefit",
      card_icon: "mdi-book-plus",
      card_allowed_access: [
        "Admin",
        "Hr",
        "Finance",
        "Management",
        "Team member",
      ],
    },
    {
      card_background: "bg-gradient-primary",
      path: "/get_form_flexi_benefit_data",
      card_title: "Download Form Flexible Benefit Data",
      card_icon: "mdi-book-plus",
      card_allowed_access: ["Finance"],
    },
    {
      card_background: "bg-gradient-success",
      path: "/alltravelrequest",
      card_title: "Travel Request Form",
      card_icon: "mdi-book-plus",
      card_allowed_access: [
        "Admin",
        "Hr",
        "Finance",
        "Management",
        "Team member",
      ],
    },
    {
      card_background: "bg-gradient-info",
      path: "/travelrequestreceived",
      card_title: "Travel Request Approvals",
      card_icon: "mdi-book-plus",
      display_none: roless?.Reporting_Manager.includes("60") ? "block" : "none",
      card_allowed_access: [
        "Admin",
        "Hr",
        "Finance",
        "Management",
        "Team member",
      ],
    },
  ];
  const data01 = [
    {
      name: `Active User`,
      value: counterList?.Active_Users,
    },
    {
      name: `Deactive User`,
      value: counterList?.Deactive_Users,
    },
  ];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={25} textAnchor="middle" fill={fill}>
          {payload.value}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />

        {/* <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        /> */}
        {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{` ${value}`}</text> */}
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text> */}
      </g>
    );
  };
  const onPieEnter = (_, index) => {
    setStates({
      activeIndex: index,
    });
    setClr(index === 0 ? "#1bcfb4" : "#fe7c96");
  };
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Page_Header
                page_title="Dashboard"
                page_title_button="Overview"
                page_title_icon="mdi-home"
              />
              {loading && (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              )}

              <>
                <div>
                  {/* Other dashboard content */}
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
                </div>
                <div className="row">
                  {cardArray?.map(
                    (result) =>
                      result?.card_allowed_access.includes(
                        LocalStorageData?.zoho_role
                      ) && (
                        <div
                          className="col-md-3 stretch-card grid-margin "
                          style={{ display: result?.display_none }}
                        >
                          <div
                            className={`card ${result?.card_background} card-img-holder text-white`}
                          >
                            <NavLink
                              to={result?.path}
                              style={{
                                color: "#f8f8f8",
                                textDecoration: "none",
                              }}
                            >
                              <div className="card-body">
                                <div>
                                  <img
                                    src="assets/images/dashboard/circle.svg"
                                    className="card-img-absolute"
                                    alt="circle-image"
                                  />
                                  <h4 className="font-weight-normal mb-3 mt-2">
                                    <span className="me-4">
                                      {result?.card_title}
                                    </span>
                                    <i
                                      className={`mdi ${result?.card_icon} mdi-24px float-right`}
                                      // style={{ float: "right" }}
                                    ></i>
                                  </h4>
                                  <h1 className="mb-4 text-center">
                                    {result?.card_counter_data}
                                  </h1>
                                </div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      )
                  )}
                </div>

                <div className="row">
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

                        {/*  */}
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
                </div>
              </>
            </div>
            <footer className="footer">
              <Footer />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
